<template>
  <Pagination />
  <Items />
  <Pagination />
</template>

<script setup>
useHead({
  title: 'Home',
});

import { ref } from 'vue';

const page = ref(1);

provide('page', page);

const changePage = (newPage) => {
  page.value = newPage;
};

const posts = [
  {
    id: 41035183,
    user: 'pwmtr',
    points: 97,
    time: 1721660213,
    url: 'https://www.ubicloud.com/blog/difference-between-running-postgres-for-yourself-and-for-others',
    type: 'story',
    title: 'Difference between running Postgres for yourself and for others',
    comments_count: 5,
    comments: [],
  },
  {
    id: 41039708,
    user: 'acrispino',
    points: 252,
    time: 1721681702,
    url: 'https://community.intel.com/t5/Processors/July-2024-Update-on-Instability-Reports-on-Intel-Core-13th-and/m-p/1617113#M74792',
    type: 'story',
    title: 'July 2024 Update on Instability Reports on Intel Core 13th/14th Gen Desktop CPUs',
    comments_count: 26,
    comments: [],
  },
  {
    id: 40995344,
    user: 'danso',
    points: 24,
    time: 1721309084,
    url: 'https://www.redthreatsec.com/blog/greenlightspart1',
    type: 'story',
    title: 'Give Me the Green Light Part 1: Hacking Traffic Control Systems',
    comments_count: 3,
    comments: [],
  },
  {
    id: 41043771,
    user: 'leroman',
    points: 7,
    time: 1721722411,
    url: 'https://github.com/romansky/dom-to-semantic-markdown',
    type: 'story',
    title: 'Show HN: DOM to Semantic Markdown – For LLMs',
    comments_count: 0,
    comments: [],
  },
  {
    id: 41037745,
    user: 'vquemener',
    points: 253,
    time: 1721672416,
    url: 'https://netflixtechblog.com/maestro-netflixs-workflow-orchestrator-ee13a06f9c78',
    type: 'story',
    title: "Maestro: Netflix's Workflow Orchestrator",
    comments_count: 26,
    comments: [],
  },
  {
    id: 40981954,
    user: 'surprisetalk',
    points: 325,
    time: 1721181588,
    url: 'https://brycemecum.com/2023/03/31/til-mermaid-tracing/',
    type: 'story',
    title: 'Mermaid Gantt diagrams for displaying distributed traces in Markdown (2023)',
    comments_count: 22,
    comments: [],
  },
  {
    id: 41033005,
    user: 'dbroockman',
    points: 162,
    time: 1721646016,
    url: 'https://www.openresearchlab.org/studies/unconditional-cash-study/study',
    type: 'story',
    title: 'Unconditional Cash Study: first findings available',
    comments_count: 42,
    comments: [],
  },
  {
    id: 41036231,
    user: 'mavsman',
    points: 244,
    time: 1721665521,
    url: 'https://github.com/bugbakery/audapolis',
    type: 'story',
    title: 'Audapolis: Edit audio files by transcript, not waveform',
    comments_count: 20,
    comments: [],
  },
  {
    id: 41021351,
    user: 'bookofjoe',
    points: 19,
    time: 1721520923,
    url: 'https://www.wsj.com/style/design/japanese-heritage-shoya-house-melding-nature-and-artifice-32d3563b',
    type: 'story',
    title: '300-Year-Old House Transported Piecemeal Japan to California, Then Reconstructed',
    comments_count: 11,
    comments: [],
  },
  {
    id: 41037079,
    user: 'bikenaga',
    points: 71,
    time: 1721669706,
    url: 'https://ieeexplore.ieee.org/document/10549891',
    type: 'story',
    title: 'A Formulation of the Trilemma in Proof of Work Blockchain',
    comments_count: 3,
    comments: [],
  },
];
</script>

<style lang="scss"></style>
