---
title: 'Tuning Fast Memory Size based on Modeling of Page Migration for Tiered Memory'
number: 3

# Authors
authors:
  - Shangye Chen
  - Jin Huang
  - Shuangyan Yang
  - Jie Liu
  - Huaicheng Li
  - Dimitrios Nikolopoulos
  - Junhee Ryu
  - Jinho Baek
  - Kwangsik Shin
  - Dong Li

date: '2024-10-01T00:00:00Z'
doi: '10.48550/arXiv.2410.00328'

# Schedule page publish date (NOT publication's date).
publishDate: '2024-10-01T00:00:00Z'

# Publication type.
publication_types: ['article']

# Publication name and optional abbreviated publication name.
publication: '*arXiv preprint arXiv:2410.00328*'
publication_short: '*arXiv:2410.00328*'

abstract: 'Tiered memory, built upon a combination of fast memory and slow memory, provides a cost-effective solution to meet ever-increasing requirements from emerging applications for large memory capacity. Reducing the size of fast memory is valuable to improve memory utilization in production and reduce production costs because fast memory tends to be expensive. However, deciding the fast memory size is challenging because there is a complex interplay between application characterization and the overhead of page migration used to mitigate the impact of limited fast memory capacity. In this paper, we introduce a system, Tuna, to decide fast memory size based on modeling of page migration. Tuna uses micro-benchmarking to model the impact of page migration on application performance using three metrics. Tuna decides the fast memory size based on offline modeling results and limited information on workload telemetry. Evaluating with common big-memory applications and using 5% as the performance loss target, we show that Tuna in combination with a page management system (TPP) saves fast memory by 8.5% on average (up to 16%). This is in contrast to the 5% saving in fast memory reported by Microsoft Pond for the same workloads (BFS and SSSP) and the same performance loss target.'

# Summary. An optional shortened abstract.
summary: 'A system to decide fast memory size based on modeling of page migration for tiered memory systems.'

tags:
  - Tiered Memory
  - Page Migration
  - Memory Management
  - Performance Modeling

featured: true

# Custom links
links:
- name: Paper
  url: https://arxiv.org/abs/2410.00328

url_pdf: 'https://arxiv.org/pdf/2410.00328'

# Featured image
image:
  caption: ''
  focal_point: ''
  preview_only: false

# Associated Projects
projects: []

# Slides
slides: ""
---

**Preprint:** arXiv:2410.00328, October 2024

This paper introduces Tuna, a system to decide fast memory size based on modeling of page migration for tiered memory systems. 