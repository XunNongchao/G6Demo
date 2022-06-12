<script setup>
import { ref, onMounted } from 'vue'
import { graphInit } from '../utils/G6Init'

onMounted(() => {
    const graph = graphInit();
    let data = {
        nodes: [
            {
                id: '1',
                label: '自定义组件',
                type: 'component',
                x: 500,
                y: 300,
                inNodes: [
                    {
                        id: 'in-1',
                        label: 'in-1',
                        value: '-'
                    },
                    {
                        id: 'in-2',
                        label: 'in-2',
                        value: '-'
                    },
                    {
                        id: 'in-3',
                        label: 'in-3',
                        value: '-'
                    },
                    {
                        id: 'in-4',
                        label: 'in-4',
                        value: '-'
                    },
                    {
                        id: 'in-5',
                        label: 'in-5',
                        value: '-'
                    }
                ],
                outNodes: [
                    {
                        id: 'out-1',
                        label: 'out-1',
                        value: '-'
                    },
                    {
                        id: 'out-2',
                        label: 'out-2',
                        value: '-'
                    },
                    {
                        id: 'out-3',
                        label: 'out-3',
                        value: '-'
                    },
                    {
                        id: 'out-4',
                        label: 'out-4',
                        value: '-'
                    },
                    {
                        id: 'out-5',
                        label: 'out-5',
                        value: '-'
                    },
                    {
                        id: 'out-6',
                        label: 'out-6',
                        value: '-'
                    }
                ],
                outInNodes: [
                    {
                        id: 'outIn-1',
                        label: 'outIn-1',
                        value: '-'
                    }
                ],
            },
            {
                id: '2',
                label: '自定义组件2',
                type: 'component',
                x: 800,
                y: 300,
                inNodes: [
                    {
                        id: 'in-1',
                        label: 'in-1',
                        value: '-'
                    },
                ],
                outNodes: [
                    {
                        id: 'out-1',
                        label: 'out-1',
                        value: '-'
                    },
                    {
                        id: 'out-2',
                        label: 'out-2',
                        value: '-'
                    }
                ],
                outInNodes: [
                    {
                        id: 'outIn-1',
                        label: 'outIn-1',
                        value: '-'
                    }
                ],
            }
        ],
        edges: [
            {source: '1', target: '2'}
        ]
    }
    graph.data(data)
    graph.render()
})

const count = ref(0)
</script>

<template>
    <div id="g6"></div>
</template>

<style scoped>
#g6 {
    height: 100%;
    width: 100%;
}
</style>
