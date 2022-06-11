<script setup>
import { ref, onMounted } from 'vue'
import { graphInit } from '../utils/G6Init'

onMounted(() => {
    const graph = graphInit();
    let data = {
        nodes: [
            {
                id: '1',
                name: '自定义组件',
                type: 'component',
                x: 500,
                y: 300,
                inNodes: [
                    {
                        name: 'in-1',
                        value: '-'
                    },
                    {
                        name: 'in-2',
                        value: '-'
                    },
                    {
                        name: 'in-3',
                        value: '-'
                    },
                    {
                        name: 'in-4',
                        value: '-'
                    },
                    {
                        name: 'in-5',
                        value: '-'
                    }
                ],
                outNodes: [
                    {
                        name: 'out-1',
                        value: '-'
                    },
                    {
                        name: 'out-2',
                        value: '-'
                    },
                    {
                        name: 'out-3',
                        value: '-'
                    },
                    {
                        name: 'out-4',
                        value: '-'
                    },
                    {
                        name: 'out-5',
                        value: '-'
                    },
                    {
                        name: 'out-6',
                        value: '-'
                    }
                ],
                outInNodes: [
                    {
                        name: 'outIn-1',
                        value: '-'
                    }
                ],
            },
            {
                id: '2',
                name: '自定义组件2',
                type: 'component',
                x: 800,
                y: 300,
                inNodes: [
                    {
                        name: 'in-1',
                        value: '-'
                    },
                ],
                outNodes: [
                    {
                        name: 'out-1',
                        value: '-'
                    },
                    {
                        name: 'out-2',
                        value: '-'
                    }
                ],
                outInNodes: [
                    {
                        name: 'outIn-1',
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
