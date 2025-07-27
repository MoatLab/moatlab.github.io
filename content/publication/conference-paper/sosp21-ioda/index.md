---
title: 'IODA: A Host/Device Co-design for Strong Predictability Contract on Modern Flash Storage'
number: 8

# Authors
authors:
  - Huaicheng Li
  - Martin L. Putra
  - Ronald Shi
  - Fadhil I. Kurnia
  - Xing Lin
  - Jaeyoung Do
  - Achmad Imam Kistijantoro
  - Gregory R. Ganger
  - Haryadi S. Gunawi

date: "2021-10-25T00:00:00Z"
doi: "10.1145/3477132.3483540"

# Schedule page publish date (NOT publication's date).
publishDate: "2021-10-25T00:00:00Z"

# Publication type.
publication_types: ["paper-conference"]

# Publication name and optional abbreviated publication name.
publication: "*Proceedings of the 28th ACM Symposium on Operating Systems Principles (SOSP '21)*"
publication_short: "*SOSP '21*"

abstract: "Modern flash storage provides high performance but suffers from unpredictable latency due to internal parallelism and resource contention. This paper presents IODA, a host/device co-design that provides strong predictability contracts for flash storage arrays."

# Summary. An optional shortened abstract.
summary: "Host/device co-design for predictable I/O performance on flash storage arrays."

tags:
  - NVMe
  - Storage Systems
  - I/O Determinism
  - Flash Arrays
  - Operating Systems

featured: true

# Custom links
links:
- name: Paper
  url: https://dl.acm.org/doi/10.1145/3477132.3483540
- name: Code
  url: https://github.com/moatlab/ioda
- name: Slides
  url: https://huaicheng.github.io/p/sosp21-ioda-slides.pdf

# Featured image
image:
  caption: ""
  focal_point: ""
  preview_only: false

# Associated Projects
projects: []

# Slides
slides: ""
---

**Conference:** 28th ACM Symposium on Operating Systems Principles (SOSP '21), October 25-28, 2021, Virtual Event, Germany

This paper presents IODA, a comprehensive framework for achieving I/O determinism in flash storage arrays. It provides programming interfaces and system support for predictable I/O performance through host/device co-design. 