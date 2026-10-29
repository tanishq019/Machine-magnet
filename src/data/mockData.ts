import { Project, Event, Member, Milestone, FocusArea, LearningResource, PassportRecord } from '../types';

export const FOCUS_AREAS: FocusArea[] = [
  {
    id: 'deep-learning',
    title: 'Artificial Intelligence & Deep Learning',
    tagline: 'From biological neural principles to frontier transformer architectures',
    description: 'We explore foundational neural networks, self-attention mechanisms, diffusion pipelines, and geometric deep learning. Club cohorts build and train vision transformers, language models, and reinforcement learning agents from scratch.',
    coreTopics: ['Vision Transformers (ViT)', 'Diffusion Probabilistic Models', 'State-Space Models (Mamba)', 'Physics-Informed Neural Networks (PINNs)'],
    activeProjects: ['DeepFlux 3D Reconstruction', 'TensorSparse Optimizer', 'BioGraph GNN'],
    techStack: ['PyTorch', 'JAX', 'Hugging Face', 'CUDA', 'Triton'],
    visualMetrics: [
      { label: 'Model Experiments Run', value: '420+' },
      { label: 'GPU Compute Hours Logged', value: '3,800h' },
      { label: 'Published Papers & Preprints', value: '5' }
    ]
  },
  {
    id: 'generative-ai',
    title: 'Generative AI & LLM Systems',
    tagline: 'Orchestrating autonomous agents, retrieval systems, and multimodal reasoning',
    description: 'Investigating high-throughput inference, low-rank adaptation (LoRA/QLoRA), dense vector search, and agentic workflows that solve domain-specific enterprise and academic problems.',
    coreTopics: ['Fine-Tuning & Quantization (AWQ/GGUF)', 'Graph-Augmented RAG', 'Agentic Function Routing', 'Multimodal Vision-Language Models'],
    activeProjects: ['NeuroScribe Graph Engine', 'CampusAssistant AI', 'DocuSynth CLI'],
    techStack: ['vLLM', 'LangChain', 'Ollama', 'LlamaIndex', 'FastAPI'],
    visualMetrics: [
      { label: 'Custom LoRA Adapters', value: '18' },
      { label: 'RAG Retrieval Latency', value: '<45ms' },
      { label: 'Open-Source Downloads', value: '12.4k' }
    ]
  },
  {
    id: 'edge-computing',
    title: 'Applied Edge AI & Embedded Systems',
    tagline: 'Sub-watt inference on microcontrollers, robotics, and edge accelerators',
    description: 'Bringing intelligence to physical hardware. Our hardware subgroup prototypes real-time computer vision on Raspberry Pi, NVIDIA Jetson, and ESP32 with int8 quantization and TensorRT acceleration.',
    coreTopics: ['TinyML on Cortex-M', 'NVIDIA Jetson Optimization', 'Edge TPU Acceleration', 'Sensor Fusion & SLAM'],
    activeProjects: ['VoxelGrid Drone Vision', 'AgriSense Crop Monitor', 'PulseMicro ECG'],
    techStack: ['TensorRT', 'OpenVINO', 'TensorFlow Lite Micro', 'ROS2', 'C++20'],
    visualMetrics: [
      { label: 'Hardware Kits Deployed', value: '26' },
      { label: 'Average On-Device FPS', value: '62 FPS' },
      { label: 'Peak Power Budget', value: '<7.5W' }
    ]
  },
  {
    id: 'data-engineering',
    title: 'Data Systems & Scalable Infrastructure',
    tagline: 'Robust pipelines, distributed training, and automated data curations',
    description: 'Great machine learning begins with clean, unbiased, large-scale data systems. We build distributed scraping pipelines, feature stores, automated validation gates, and synthetic data generation harnesses.',
    coreTopics: ['Distributed Training (FSDP/DeepSpeed)', 'Vector Databases & Similarity Search', 'Feature Store Architectures', 'Automated Data Labeling Loops'],
    activeProjects: ['DataWeave Orchestrator', 'OmniDataset NIET', 'TensorAudit Tool'],
    techStack: ['Apache Kafka', 'DuckDB', 'Qdrant', 'PostgreSQL', 'Docker'],
    visualMetrics: [
      { label: 'Processed Datapoints', value: '1.2B' },
      { label: 'Pipeline Uptime', value: '99.8%' },
      { label: 'Validation Filters', value: '48 Rules' }
    ]
  },
  {
    id: 'collaborative-research',
    title: 'Technical Sprints & Collaborative Labs',
    tagline: 'Rigorous peer learning, paper reading circles, and competitive hackathons',
    description: 'Weekly research roundtables deconstructing recent NeurIPS, ICML, and CVPR papers. Teams form cross-functional pods for national hackathons, Smart India Hackathon, and open research initiatives.',
    coreTopics: ['ArXiv Paper Deconstructions', 'Algorithmic Problem Solving', 'Open Source Contribution Sprints', 'Ethics & Responsible AI Safety'],
    activeProjects: ['ArXiv Weekly Digest', 'Beginner to PyTorch Sprint', 'SIH AI Pod'],
    techStack: ['Git / GitHub', 'Weights & Biases', 'LaTeX', 'Streamlit', 'Notion'],
    visualMetrics: [
      { label: 'Weekly Seminar Attendees', value: '140+' },
      { label: 'National Hackathon Podiums', value: '14' },
      { label: 'Active Student Contributors', value: '85+' }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'deepflux',
    title: 'DeepFlux 3D Neuro-Reconstruction',
    subtitle: 'High-speed volumetric neural tensor field synthesis from sparse magnetic resonance scans',
    category: 'Computer Vision',
    techStack: ['PyTorch', 'CUDA', 'TorchVision', 'Triton', 'FastAPI'],
    description: 'DeepFlux utilizes an implicit neural representation network combined with 3D coordinate encoders to reconstruct high-fidelity medical voxel grids from 80% fewer scanning slices, cutting clinical acquisition time drastically.',
    highlights: [
      'Reduces MRI scan duration from 35 mins to under 7 mins with <0.02 MSE loss',
      'Custom Triton kernel for accelerated spatial hash grid lookup',
      'Evaluated against Stanford BraTS dataset with 34.2 dB PSNR score'
    ],
    status: 'Active Lab',
    githubUrl: 'https://github.com/machine-magnets-niet/deepflux-3d',
    demoUrl: 'https://deepflux-preview.niet.ac.in',
    image: '/src/assets/images/project_deepflux_1793252595461.jpg',
    stars: 184,
    contributors: ['Aarav Sharma', 'Isha Verma', 'Rohan Gupta', 'Kavya Sen'],
    metrics: [
      { label: 'PSNR Score', value: '34.2 dB' },
      { label: 'Inference Speed', value: '82 ms/vol' },
      { label: 'Slice Compression', value: '4.8x' }
    ]
  },
  {
    id: 'aethervoice',
    title: 'AetherVoice Edge Translator',
    subtitle: 'Zero-shot streaming speech-to-speech translation optimized for low-resource Indian dialects',
    category: 'Edge Computing',
    techStack: ['C++', 'TensorRT', 'ONNX Runtime', 'Whisper.cpp', 'Raspberry Pi 5'],
    description: 'An offline-first embedded edge translation pipeline capable of bidirectional Hindi, Bhojpuri, Punjabi, and English voice synthesis at under 180ms latency on edge hardware.',
    highlights: [
      'Operates entirely air-gapped on edge micro-workstations without internet access',
      'INT8 quantized acoustic encoder with negligible perceptual loss',
      'Deployed for trial during rural tele-health health camps in Uttar Pradesh'
    ],
    status: 'Production',
    githubUrl: 'https://github.com/machine-magnets-niet/aethervoice-edge',
    demoUrl: 'https://aethervoice.niet.ac.in',
    image: '/src/assets/images/club_workspace_lab_1793252596964.jpg',
    stars: 236,
    contributors: ['Devansh Mathur', 'Ananya Patel', 'Tanishq Sinha'],
    metrics: [
      { label: 'End-to-End Latency', value: '172 ms' },
      { label: 'RAM Footprint', value: '480 MB' },
      { label: 'Supported Dialects', value: '8 Regional' }
    ]
  },
  {
    id: 'neuroscribe',
    title: 'NeuroScribe Graph Synthesizer',
    subtitle: 'Agentic knowledge graph compiler that turns unstructured research papers into verifiable logic networks',
    category: 'Generative AI',
    techStack: ['Python', 'LlamaIndex', 'Qdrant', 'Neo4j', 'FastAPI'],
    description: 'NeuroScribe reads batches of ArXiv scientific PDFs, extracts entity relation triplets with certainty bounds, and constructs interactive semantic graphs that prevent LLM hallucinations during query synthesis.',
    highlights: [
      'Zero-hallucination citation verification with strict entity anchoring',
      'Direct integration with Obsidian and Zotero markdown workspaces',
      'Benchmarked on 10,000 biomedical and computer science research preprints'
    ],
    status: 'Research Beta',
    githubUrl: 'https://github.com/machine-magnets-niet/neuroscribe-graph',
    demoUrl: 'https://neuroscribe.niet.ac.in',
    image: '/src/assets/images/hero_magnetic_ai_1793252594611.jpg',
    stars: 142,
    contributors: ['Siddharth Rao', 'Pooja Agarwal', 'Mehul Joshi'],
    metrics: [
      { label: 'Triplet Extraction F1', value: '0.892' },
      { label: 'Corpus Indexed', value: '14,000 PDFs' },
      { label: 'Graph Query Time', value: '38 ms' }
    ]
  },
  {
    id: 'voxelgrid',
    title: 'VoxelGrid Autonomous Drone SLAM',
    subtitle: 'Real-time 3D Gaussian splatting and obstacle avoidance for autonomous indoor navigation',
    category: 'Systems & Data',
    techStack: ['ROS2', 'CUDA', 'C++20', 'PyTorch3D', 'Jetson Orin Nano'],
    description: 'Designed for GPS-denied environments such as collapsed structures or warehouse corridors. Uses depth cameras and IMU sensor fusion to reconstruct surrounding geometry in sub-15ms passes.',
    highlights: [
      'Smart India Hackathon 2025 Regional First Prize Project',
      'Real-time collision avoidance at velocities up to 4.5 m/s',
      'Tested across 40+ simulated and physical obstacle courses at NIET lab'
    ],
    status: 'Active Lab',
    githubUrl: 'https://github.com/machine-magnets-niet/voxelgrid-slam',
    demoUrl: 'https://voxelgrid.niet.ac.in',
    image: '/src/assets/images/event_tech_summit_1793252595538.jpg',
    stars: 310,
    contributors: ['Karan Bhatia', 'Aarav Sharma', 'Sanya Kapoor'],
    metrics: [
      { label: 'Trajectory Drift', value: '<1.2%' },
      { label: 'Render Rate', value: '45 FPS' },
      { label: 'Max Speed Tested', value: '4.5 m/s' }
    ]
  }
];

export const EVENTS: Event[] = [
  {
    id: 'neural-nexus-2026',
    title: 'NIET Neural Nexus 2026: AI Symposium & 36h Hackathon',
    category: 'Hackathons',
    date: 'November 14–16, 2026',
    rawDate: '2026-11-14T09:00:00Z',
    time: '09:00 AM IST onwards',
    venue: 'Auditorium 1 & Main AI Compute Centre, NIET Campus',
    mode: 'In-Person (Lab 402, NIET)',
    deadline: 'November 08, 2026',
    registrationUrl: '#join-club',
    status: 'Filling Fast',
    coverImage: '/src/assets/images/event_tech_summit_1793252595538.jpg',
    tags: ['Flagship Hackathon', '₹1,50,000 Prize Pool', 'Industry Mentors', 'Compute Grants'],
    description: 'The premier collegiate hackathon in NCR. 36 hours of relentless engineering across three tracks: Frontier Generative Systems, Edge Intelligence for Robotics, and Open Healthcare AI.',
    speakers: [
      { name: 'Dr. Alok Verma', role: 'Head of AI Research', org: 'NIET Innovation Council' },
      { name: 'Dr. Radhika Sen', role: 'Principal Research Scientist', org: 'Frontier AI Labs' },
      { name: 'Vikram Khurana', role: 'Staff Systems Architect', org: 'NeuralCompute Systems' }
    ],
    agenda: [
      { time: '09:00 AM', activity: 'Opening Keynote: Scaling Laws and Small Model Architectures' },
      { time: '11:30 AM', activity: 'Hackathon Kickoff & Problem Statement Release' },
      { time: '04:00 PM', activity: 'Mentor Round 1: Model Architecture & Feasibility Audit' },
      { time: '09:00 PM', activity: 'Late Night GPU Compute Surge & Flash Workshops' },
      { time: '02:00 PM (Day 2)', activity: 'Final Submissions, Live Demos & Jury Scoring' }
    ]
  },
  {
    id: 'diffusion-deep-dive',
    title: 'Masterclass: Building Latent Diffusion Models from First Principles',
    category: 'Workshops',
    date: 'November 22, 2026',
    rawDate: '2026-11-22T14:00:00Z',
    time: '02:00 PM – 06:00 PM IST',
    venue: 'Lab 402 (Machine Learning Lab), NIET',
    mode: 'Hybrid',
    deadline: 'November 20, 2026',
    registrationUrl: '#join-club',
    status: 'Open',
    coverImage: '/src/assets/images/hero_magnetic_ai_1793252594611.jpg',
    tags: ['Hands-on Code', 'PyTorch 2.5', 'Free GPU Access', 'Certificate'],
    description: 'A 4-hour rigorous code-first masterclass where attendees construct an entire score-based generative model and U-Net noise predictor from mathematical scratch in PyTorch.',
    speakers: [
      { name: 'Aarav Sharma', role: 'Technical Lead', org: 'Machine Magnets NIET' },
      { name: 'Isha Verma', role: 'Core ML Lead', org: 'Machine Magnets NIET' }
    ],
    agenda: [
      { time: '02:00 PM', activity: 'Mathematics of Forward & Reverse Brownian Noise Schedules' },
      { time: '03:15 PM', activity: 'Hands-on Coding: Writing the U-Net with Residual Cross-Attention' },
      { time: '04:45 PM', activity: 'Classifier-Free Guidance and Sampler Optimizations (DDIM/Euler)' },
      { time: '05:30 PM', activity: 'Fine-Tuning on Custom Artistic & Technical Datasets' }
    ]
  },
  {
    id: 'edge-tinyml-sprint',
    title: 'Hardware Sprint: Quantizing Vision Models for Jetson & ESP32',
    category: 'Sprints',
    date: 'December 05, 2026',
    rawDate: '2026-12-05T10:00:00Z',
    time: '10:00 AM – 04:30 PM IST',
    venue: 'Embedded Systems Innovation Center, NIET',
    mode: 'In-Person (Lab 402, NIET)',
    deadline: 'December 01, 2026',
    registrationUrl: '#join-club',
    status: 'Open',
    coverImage: '/src/assets/images/club_workspace_lab_1793252596964.jpg',
    tags: ['Hardware Kits Provided', 'C++ / TensorRT', 'Robotics Track'],
    description: 'Demystifying quantization, pruning, and low-latency C++ runtimes for physical devices. Attendees will flash custom neural models onto physical hardware kits and measure real wattages.',
    speakers: [
      { name: 'Devansh Mathur', role: 'Hardware & Systems Lead', org: 'Machine Magnets' },
      { name: 'Prof. R. K. Singhal', role: 'Embedded Labs Director', org: 'NIET' }
    ],
    agenda: [
      { time: '10:00 AM', activity: 'Post-Training Quantization (PTQ) vs Quantization-Aware Training (QAT)' },
      { time: '12:00 PM', activity: 'Exporting PyTorch graphs to ONNX and compiling TensorRT engines' },
      { time: '02:00 PM', activity: 'Deploying onto Raspberry Pi 5 & Jetson Orin Nano boards' },
      { time: '03:45 PM', activity: 'Live Benchmarking: Watts, Memory Bandwidth, and FPS' }
    ]
  }
];

export const TIMELINE: Milestone[] = [
  {
    id: 'm1',
    year: '2023',
    date: 'September 2023',
    title: 'The Magnetic Core Ignites',
    subtitle: 'Foundation of Machine Magnets at NIET Knowledge Park II',
    description: 'Founded by a passionate collective of CS & AI students at NIET to transition from theoretical textbook coursework to production-grade model training and open-source software engineering.',
    tag: 'Club Genesis',
    metric: '18 Founding Builders',
    highlightText: 'Established initial student lab setup with 4 dedicated RTX workstations in Lab 402.'
  },
  {
    id: 'm2',
    year: '2024',
    date: 'March 2024',
    title: 'First National Podiums',
    subtitle: 'Smart India Hackathon Regional Victory',
    description: 'The club team engineered an automated computer vision inspection framework for agricultural crop diseases, securing first position at the regional technical finals.',
    tag: 'National Recognition',
    metric: '1st Place Regional',
    highlightText: 'Awarded research grant by university incubation cell to deploy prototype.'
  },
  {
    id: 'm3',
    year: '2024',
    date: 'November 2024',
    title: 'Open Source Neural Suite',
    subtitle: 'Release of TensorSparse & Student PyTorch Cookbook',
    description: 'Published our first club-wide open-source library, achieving 1,200+ stars on GitHub and adopted by over 20 collegiate technical societies across northern India.',
    tag: 'Open Source Release',
    metric: '1,200+ Stars',
    highlightText: 'Initiated bi-weekly community workshops reaching over 600 student attendees.'
  },
  {
    id: 'm4',
    year: '2025',
    date: 'April 2025',
    title: 'NIET Neural Nexus Debut',
    subtitle: 'Inter-College 36-Hour Hackathon with 400+ Hackers',
    description: 'Hosted the inaugural Neural Nexus symposium, bringing together engineers, faculty judges, and industry sponsors from leading technology startups in NCR.',
    tag: 'Flagship Event',
    metric: '420+ Participants',
    highlightText: '72 completed project prototypes submitted with 0% downtime on local servers.'
  },
  {
    id: 'm5',
    year: '2025',
    date: 'October 2025',
    title: 'Edge AI Research Cell',
    subtitle: 'Specialized Hardware Lab & Jetson Computing Cluster',
    description: 'Formed the dedicated Embedded Intelligence subgroup with university funding, acquiring NVIDIA Jetson Orin units to pioneer on-device robotics algorithms.',
    tag: 'Lab Expansion',
    metric: '12 Edge Testbeds',
    highlightText: 'Partnered with institutional incubation center for robotics pilot deployments.'
  },
  {
    id: 'm6',
    year: '2026',
    date: 'October 2026',
    title: 'The Next Quantum Leap',
    subtitle: 'Digital Passport & Federated Student Learning Network',
    description: 'Launching the unified Machine Magnets digital platform, verified skill passport system, and collaborative model evaluation benchmark for all NIET students.',
    tag: 'Current Frontier',
    metric: '1,200+ Members',
    highlightText: 'Continuous deployment of student-led AI research with real community impact.'
  }
];

export const MEMBERS: Member[] = [
  {
    id: 'advisor-1',
    name: 'Dr. C. S. Yadav',
    role: 'Faculty Advisor & Head of AI Research',
    group: 'Mentorship & Advisory',
    department: 'Department of Computer Science & Engineering, NIET',
    year: 'Faculty Mentorship',
    bio: 'Guiding university research in neural architectures, computer vision, and student technical initiatives. 18+ years of academic and institutional research leadership.',
    researchInterests: ['Neural Compression', 'Medical Image Computing', 'Academic Mentorship'],
    linkedin: 'https://linkedin.com/in/niet-faculty-advisor',
    badges: ['Senior IEEE Member', 'Faculty Mentor of the Year', 'Institutional Advisor'],
    projects: ['DeepFlux Advisory', 'NIET AI Lab Framework']
  },
  {
    id: 'lead-1',
    name: 'Aarav Sharma',
    role: 'Club President & Lead Architect',
    group: 'Core Leadership',
    department: 'CSE (Artificial Intelligence & Machine Learning)',
    year: 'Final Year / Class of 2027',
    bio: 'Passionate about deep learning systems, distributed training, and open source. Led DeepFlux 3D and organized the annual Neural Nexus hackathon.',
    researchInterests: ['Implicit Neural Representations', 'CUDA Systems', 'Transformers'],
    github: 'https://github.com/aarav-sharma-ml',
    linkedin: 'https://linkedin.com/in/aarav-sharma-niet',
    badges: ['SIH Winner', 'PyTorch Contributor', 'Kaggle Master'],
    projects: ['DeepFlux 3D', 'TensorSparse']
  },
  {
    id: 'lead-2',
    name: 'Isha Verma',
    role: 'Vice President & Head of ML Research',
    group: 'Core Leadership',
    department: 'CSE (Data Science)',
    year: 'Final Year / Class of 2027',
    bio: 'Focusing on diffusion models, multimodal representations, and peer curriculum design. Spearheaded our weekly paper deconstruction seminars.',
    researchInterests: ['Score-Based Diffusion', 'Multimodal Vision-Language', 'Ethics in AI'],
    github: 'https://github.com/isha-verma-ai',
    linkedin: 'https://linkedin.com/in/isha-verma-niet',
    badges: ['Research Fellow', 'NeurIPS Paper Circle Lead', 'Hackathon Mentor'],
    projects: ['DeepFlux 3D', 'BioGraph GNN']
  },
  {
    id: 'lead-3',
    name: 'Devansh Mathur',
    role: 'Technical Lead (Edge & Hardware)',
    group: 'Research & Engineering',
    department: 'Electronics & Communication Engineering',
    year: 'Third Year / Class of 2028',
    bio: 'Bridging silicon and neural networks. Specializes in low-bit model quantization, TensorRT acceleration, and autonomous robotics on NVIDIA Jetson.',
    researchInterests: ['TinyML', 'FPGA Acceleration', 'Autonomous Navigation'],
    github: 'https://github.com/devansh-mathur-sys',
    linkedin: 'https://linkedin.com/in/devansh-mathur-niet',
    badges: ['Hardware Wizard', 'ROS2 Developer', 'Jetson Certified'],
    projects: ['AetherVoice Edge', 'VoxelGrid SLAM']
  },
  {
    id: 'lead-4',
    name: 'Ananya Patel',
    role: 'Director of Operations & Community',
    group: 'Core Leadership',
    department: 'Information Technology',
    year: 'Third Year / Class of 2028',
    bio: 'Coordinates club hackathons, corporate industry sponsorships, guest lectures, and student onboarding cohorts. Passionate about developer advocacy.',
    researchInterests: ['AI Governance', 'Developer Tools', 'Open Source Community'],
    github: 'https://github.com/ananya-patel-dev',
    linkedin: 'https://linkedin.com/in/ananya-patel-niet',
    badges: ['Community Champion', 'Event Strategist', 'Tech Speaker'],
    projects: ['Neural Nexus 2026', 'CampusAssistant AI']
  },
  {
    id: 'lead-5',
    name: 'Siddharth Rao',
    role: 'Lead AI Engineer (NLP & Agents)',
    group: 'Research & Engineering',
    department: 'CSE (AI & ML)',
    year: 'Third Year / Class of 2028',
    bio: 'Specialist in agentic architectures, vector retrieval pipelines, and graph neural networks. Creator of the NeuroScribe semantic knowledge graph compiler.',
    researchInterests: ['Agentic Workflows', 'Graph-Augmented RAG', 'LoRA Quantization'],
    github: 'https://github.com/siddharth-rao-ai',
    linkedin: 'https://linkedin.com/in/siddharth-rao-niet',
    badges: ['LLM Architect', 'Vector Search Specialist', 'Open Source Contributor'],
    projects: ['NeuroScribe Graph', 'DocuSynth CLI']
  }
];

export const LEARNING_RESOURCES: LearningResource[] = [
  {
    id: 'res-1',
    title: 'The Machine Magnets 0-to-1 Deep Learning Roadmap',
    category: 'AI/ML',
    type: 'Roadmap',
    difficulty: 'Beginner',
    description: 'A curated 12-week comprehensive progression from Python linear algebra and automatic differentiation to implementing convolutional networks and self-attention in PyTorch.',
    author: 'Machine Magnets Academic Committee',
    link: '#resource-roadmap',
    readTime: '15 min read',
    topics: ['NumPy from Scratch', 'Autograd Mechanics', 'Backpropagation', 'PyTorch Datasets']
  },
  {
    id: 'res-2',
    title: 'Writing Custom CUDA Kernels for PyTorch with Triton',
    category: 'Developer Tools',
    type: 'Interactive Guide',
    difficulty: 'Advanced',
    description: 'Step-by-step technical guide for writing GPU-accelerated fused activation and matrix multiplication kernels using OpenAI Triton without writing raw low-level C++ CUDA.',
    author: 'Aarav Sharma (Technical Lead)',
    link: '#resource-triton',
    readTime: '24 min read',
    topics: ['Block Memory Layout', 'SRAM Tiling', 'Warp Shuffles', 'Performance Profiling']
  },
  {
    id: 'res-3',
    title: 'Complete Guide to Quantization: GGUF, AWQ, and GPTQ',
    category: 'Data Science',
    type: 'Cheatsheet',
    difficulty: 'Intermediate',
    description: 'Detailed comparative analysis of post-training quantization techniques for running 70B parameter models on consumer hardware with minimal perplexity degradation.',
    author: 'Devansh Mathur & Siddharth Rao',
    link: '#resource-quant',
    readTime: '18 min read',
    topics: ['Weight-Only Quantization', 'Activation Outliers', 'Kernel Execution Speeds', 'VRAM Budgets']
  },
  {
    id: 'res-4',
    title: 'Zero-to-Hero Vision Transformers (ViT) Implementation',
    category: 'AI/ML',
    type: 'Starter Code',
    difficulty: 'Intermediate',
    description: 'A clean, commented single-file PyTorch implementation of the Vision Transformer architecture with patch projection, positional embeddings, and multi-head self-attention.',
    author: 'Isha Verma (ML Research Head)',
    link: '#resource-vit',
    readTime: '12 min code walk',
    topics: ['Patch Extraction', 'Class Token', 'Multi-Head Attention', 'CIFAR-100 Training']
  },
  {
    id: 'res-5',
    title: 'Edge Deployment on NVIDIA Jetson with TensorRT & ROS2',
    category: 'Programming',
    type: 'Workshop Guide',
    difficulty: 'Advanced',
    description: 'Production handbook for converting YOLOv10 and MobileNet models into optimized TensorRT engines with zero-copy shared memory queues inside ROS2 nodes.',
    author: 'Hardware & Systems Subgroup',
    link: '#resource-jetson',
    readTime: '30 min walkthrough',
    topics: ['INT8 Calibration', 'ROS2 Lifecycle Nodes', 'Shared Memory Transport', 'FPS Benchmarks']
  }
];

export const SAMPLE_PASSPORTS: Record<string, PassportRecord> = {
  'NIET/2023/AI042': {
    passportId: 'MM-PASS-8841-A',
    studentId: 'NIET/2023/AI042',
    name: 'Aarav Sharma',
    branch: 'CSE (AI & ML) — Batch 2023-2027',
    tier: 'Core Fellow',
    joinDate: 'September 2023',
    workshopsAttended: 18,
    hackathonWins: 4,
    repositoriesContributed: 8,
    verifiedBadges: [
      { name: 'PyTorch Systems Architect', date: 'Oct 2024', category: 'Deep Learning' },
      { name: 'Smart India Hackathon Finalist', date: 'Mar 2024', category: 'Competitive' },
      { name: 'CUDA Triton Kernel Specialist', date: 'Jan 2025', category: 'High-Performance' },
      { name: 'Neural Nexus 2025 Organizer', date: 'Apr 2025', category: 'Community' }
    ],
    signatureHash: '0x8f2a...c4e9b7201a'
  },
  'NIET/2024/CS108': {
    passportId: 'MM-PASS-9102-B',
    studentId: 'NIET/2024/CS108',
    name: 'Isha Verma',
    branch: 'CSE (Data Science) — Batch 2024-2028',
    tier: 'Research Contributor',
    joinDate: 'January 2024',
    workshopsAttended: 14,
    hackathonWins: 2,
    repositoriesContributed: 5,
    verifiedBadges: [
      { name: 'Diffusion Modeling Fellow', date: 'Nov 2024', category: 'Research' },
      { name: 'Paper Deconstruction Lead', date: 'Aug 2024', category: 'Curriculum' },
      { name: 'Vector Database Engineer', date: 'Feb 2025', category: 'Systems' }
    ],
    signatureHash: '0x3b1c...9a7df4182e'
  },
  'NIET/2025/EC077': {
    passportId: 'MM-PASS-1049-C',
    studentId: 'NIET/2025/EC077',
    name: 'Devansh Mathur',
    branch: 'ECE (Embedded Systems) — Batch 2025-2029',
    tier: 'Junior Builder',
    joinDate: 'August 2025',
    workshopsAttended: 8,
    hackathonWins: 1,
    repositoriesContributed: 3,
    verifiedBadges: [
      { name: 'Edge AI Deployment Specialist', date: 'Sep 2025', category: 'Hardware' },
      { name: 'TensorRT Acceleration Master', date: 'Dec 2025', category: 'Optimization' }
    ],
    signatureHash: '0x17fa...65de8933b1'
  }
};
