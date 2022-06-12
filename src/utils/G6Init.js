import G6 from '@antv/g6';

/*定义默认宽高*/
// 定义默认容器宽度
const defaultWidth = 250;
// 头高
const headerHeight = 20;
// 间隙高
const spaceHeight = 10;
// 节点高
const nodeHeight = 20;


// 文本偏移量
const txtMarginLeft = 10
const txtMarginTop = 15
// 圆角弧度
const componentRadius = 6


/*定义默认颜色*/
// 容器描边颜色
const strokeColor = '#000'
// 头背景颜色
const headerBgColor = '#2196f3';
// 头文字颜色
const headerTxtColor = '#fff';
// 间隙颜色
const spaceColor = '#fff';
// 节点文字颜色
const nodeTxtColor = '#000'
// 输入节点颜色
const inNodeColor = '#fcac64';
// 输出节点颜色
const outNodeColor = '#c59def';
// 输入输出节点颜色
const outInNodeColor = '#00eb81';

/**
 * 向图形组中添加节点
 * 
 * @param {Group} group 图形组
 * @param {Array} nodeArr 节点数组
 * @param {String} nodeType 节点类型（in、out、outIn）
 * @param {Int} currentHeight 当前容器高度
 */
function handleNodeShape(group, nodeArr, nodeType, currentHeight) {
    let color;
    // 调整节点颜色
    switch (nodeType) {
        case 'in':
            color = inNodeColor;
            break;
        case 'out':
            color = outNodeColor;
            break;
        case 'outIn':
            color = outInNodeColor;
            break;
    }
    nodeArr.forEach((item, index) => {
        group.addShape('rect', {
            attrs: {
                x: 0,
                y: currentHeight,
                width: defaultWidth,
                height: nodeHeight,
                fill: color,
                anchorPoints: [
                    [0, 0.5],
                    [1, 0.5]
                ]
            },
            name: nodeType + 'Node-rect-' + index
        });
        group.addShape('text', {
            attrs: {
                text: item.label,
                fill: nodeTxtColor,
                x: txtMarginLeft,
                y: txtMarginTop + currentHeight
            },
            name: nodeType + 'Node-name-' + index
        });
        group.addShape('text', {
            attrs: {
                text: item.value,
                fill: nodeTxtColor,
                x: defaultWidth - txtMarginLeft,
                y: txtMarginTop + currentHeight
            },
            name: nodeType + 'Node-value-' + index
        });
        // 整体高度添加一个节点高度
        currentHeight += nodeHeight;
    });
    // 更新当前高度
    return currentHeight;
}

/**
 * 注册
 */
function registerThings() {
    G6.registerNode('component', {
        draw(cfg, group) {
            // 总节点数
            const totalNodes = cfg.inNodes.length + cfg.outNodes.length + cfg.outInNodes.length;
            // 容器高度 = 头高 + 2*间隙高 + 点数*点高
            const containerHeight = headerHeight + 2 * spaceHeight + totalNodes * nodeHeight;
            // 外部容器
            const containerGroup = group.addGroup({
                id: 'container'
            });
            containerGroup.addShape('rect', {
                attrs: {
                    x: 0,
                    y: 0,
                    width: defaultWidth,
                    height: containerHeight,
                    stroke: strokeColor,
                    radius: componentRadius
                },
                name: 'container-group'
            });
            // 容器头
            const headerGroup = group.addGroup({
                id: 'header-group',
            });
            headerGroup.addShape('rect', {
                attrs: {
                    x: 0,
                    y: 0,
                    width: defaultWidth,
                    height: headerHeight,
                    fill: headerBgColor,
                    // 头的上边两个圆角
                    radius: [componentRadius, componentRadius, 0, 0],
                    cursor: 'move'
                },
                name: 'header-rect',
                draggable: true
            });
            headerGroup.addShape('text', {
                attrs: {
                    x: txtMarginLeft,
                    y: txtMarginTop,
                    text: cfg.label,
                    fill: headerTxtColor,
                    cursor: 'move'
                },
                name: 'header-text',
                draggable: true
            });

            // 容器体
            const bodyGroup = group.addGroup({
                id: 'body-group'
            });
            bodyGroup.addShape('rect', {
                attrs: {
                    x: 0,
                    y: headerHeight,
                    width: defaultWidth,
                    height: spaceHeight,
                    fill: spaceColor
                },
                name: 'space'
            });

            let currentHeight = headerHeight + spaceHeight;
            // 输入节点
            const inGroup = bodyGroup.addGroup({
                id: 'in-group'
            });
            currentHeight = handleNodeShape(inGroup, cfg.inNodes, 'in', currentHeight);
            // 输出节点
            const outGroup = bodyGroup.addGroup({
                id: 'out-group'
            });
            currentHeight = handleNodeShape(outGroup, cfg.outNodes, 'out', currentHeight);
            // 输入输出节点
            const outInGroup = bodyGroup.addGroup({
                id: 'outIn-group'
            });
            currentHeight = handleNodeShape(outInGroup, cfg.outInNodes, 'outIn', currentHeight);

            // 间隙
            bodyGroup.addShape('rect', {
                attrs: {
                    x: 0,
                    y: currentHeight,
                    width: defaultWidth,
                    height: spaceHeight,
                    fill: spaceColor,
                    // 底的下边两个圆角
                    radius: [0, 0, componentRadius, componentRadius]
                },
                name: 'space2'
            });
            return containerGroup;
        },
        getAnchorPoints(cfg) {
            // 总节点数
            const totalNodes = cfg.inNodes.length + cfg.outNodes.length + cfg.outInNodes.length;
            // 容器高度 = 头高 + 2*间隙高 + 点数*点高
            const containerHeight = headerHeight + 2 * spaceHeight + totalNodes * nodeHeight;
            // 每个锚点间距
            const realNodeHeight = (nodeHeight / 2) / containerHeight;
            // 节点左上角为[0, 0]，右下角为[1, 1]
            // 除去头尾的开始和结束
            const start = (headerHeight + spaceHeight) / containerHeight + realNodeHeight;
            const end = 1 - spaceHeight / containerHeight - realNodeHeight;
            // 锚点数组 
            // todo 输入节点左边有锚点，输出节点右边有锚点，输入输出左右均有锚点
            const pointArr = [];
            // 当前锚点位置
            let current = start;
            cfg.inNodes.forEach(item => {
                pointArr.push([0, current]);
                current += realNodeHeight;
            })
            cfg.outNodes.forEach(item => {
                pointArr.push([1, current]);
                current += realNodeHeight;
            })
            cfg.outInNodes.forEach(item => {
                pointArr.push([0, current]);
                pointArr.push([1, current]);
                current += realNodeHeight;
            })
            console.log('pointArr', pointArr)
            return pointArr;
        }
    });
    // todo 设置自定义连线方式，根据组件id和节点id创建连线
    G6.registerEdge('node-line', {
        
    })
}

export function graphInit() {

    registerThings();

    // 创建graph实例
    const graph = new G6.Graph({
        container: 'g6',
        fitView: true,
        // defaultNode: {
        //     type: 'component'
        // },
        modes: {
            default: ['drag-canvas', 'drag-node']
        },
    });
    // 自定义点击事件
    graph.on('node:click', evt => {
        console.log('node:click', evt);
        const target = evt.target;
        switch (evt.target.get('parent').get('id')) {
            // 输入节点
            case 'in-group':
                console.log('in')
                break;
                // 输出节点
            case 'out-group':
                console.log('out')
                break;
                // 输入输出节点
            case 'outIn-group':
                console.log('outIn')
                break;
        }
    });
    return graph;
}