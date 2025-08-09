---
title: "Tiny-Tail Flash: Near-Perfect Elimination of Garbage Collection Tail Latencies in NAND SSDs"
number: 99
authors: ["Shiqin Yan", "Huaicheng Li", "Mingzhe Hao", "Michael Hao Tong", "Swaminatahan Sundararaman", "Andrew A. Chien", "Haryadi S. Gunawi"]
date: 2017-02-01
publication_types: ["1"]
publication: "In 15th USENIX Conference on File and Storage Technologies (FAST)"
publication_short: "FAST '17"
award: "Best Paper Nominee"
abstract: "Garbage collection (GC) in NAND SSDs introduces long tail latencies that significantly impact application performance. We present Tiny-Tail Flash (TTFlash), a novel SSD design that near-perfectly eliminates GC-induced tail latencies. TTFlash introduces three key techniques: GC-tolerant read, GC-tolerant write, and GC-tolerant flush, which collectively ensure that GC operations do not block user I/O requests. Our evaluation shows that TTFlash reduces 99.99th percentile latencies by up to 79% compared to state-of-the-art SSDs while maintaining high throughput."
featured: false
image:
  caption: ""
  focal_point: ""
  preview_only: false
url_pdf: "https://huaicheng.github.io/p/fast17-ttflash.pdf"
url_code: "https://github.com/ucare-uchicago/tinyTailFlash"
url_slides: "https://huaicheng.github.io/s/fast17-ttflash-slides.pdf"
url_video: ""
url_dataset: ""
url_poster: ""
url_source: ""
math: false
highlight: false
projects: []
slides: ""
--- 