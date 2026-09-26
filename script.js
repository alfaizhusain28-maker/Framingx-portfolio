/**
 * FramingX AI — Dark & Cinematic Portfolio Engine
 * Scroll-linked Canvas Animation, Persistent Background, Modals, Accordions, GSAP Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  const FRAME_COUNT = 81;
  const FOLDER_NAME = 'My vid';

  // DOM Elements
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  const heroTrack = document.getElementById('hero');
  const preloader = document.getElementById('preloader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderPercent = document.getElementById('loader-percent');
  const loaderStatus = document.getElementById('loader-status');
  const navLinks = document.querySelectorAll('.nav-item');

  // Modals
  const videoModal = document.getElementById('video-modal');
  const modalActiveVideo = document.getElementById('modal-active-video');
  const modalVideoTitle = document.getElementById('modal-video-title');
  const modalVideoCat = document.getElementById('modal-video-cat');
  const modalShelfItems = document.getElementById('modal-shelf-items');
  const btnCloseVideoModal = document.getElementById('btn-close-video-modal');
  const btnSeeMoreVideos = document.getElementById('btn-see-more-videos');

  const galleryModal = document.getElementById('gallery-modal');
  const btnCloseGalleryModal = document.getElementById('btn-close-gallery-modal');
  const btnSeeMorePhotos = document.getElementById('btn-see-more-photos');
  const galleryTabs = document.querySelectorAll('.gallery-tabs .tab-btn');
  const modalGalleryGrid = document.getElementById('modal-gallery-grid');

  const commercialsModal = document.getElementById('commercials-gallery-modal');
  const btnCloseCommercialsModal = document.getElementById('btn-close-commercials-modal');
  const commercialsTabs = document.querySelectorAll('#commercials-gallery-tabs .tab-btn');
  const modalCommercialsGrid = document.getElementById('modal-commercials-grid');

  // Video Database for Modal & Shelf (All 8 Showcase Commercials, aligned with Showreel Slots 1-8)
  const videoProjects = [
    {
      id: 'v1',
      title: 'Chocolate Protein Shake',
      category: 'Food & Fitness',
      videoSrc: 'Chocolate protien shake.mp4',
      poster: 'thumbnails/chocolate_shake.png',
      desc: 'Dynamic fitness campaign ad featuring rich fluid simulations, athletic motion, and bold typographic overlays.'
    },
    {
      id: 'v2',
      title: 'Lip Balm',
      category: 'Beauty & Care',
      videoSrc: 'Lip balm.mp4',
      poster: 'thumbnails/lip_balm.jpeg',
      desc: 'Radiant micro-detail cosmetic advertisement highlighting product purity, viscosity, and skin texture.'
    },
    {
      id: 'v3',
      title: 'Luxury Perfume',
      category: 'Luxury Fragrance',
      videoSrc: 'Luxury perfume.mp4',
      poster: 'thumbnails/luxury_perfume.jpg',
      desc: 'Moody twilight fragrance commercial featuring velvet shadows, particulate physics, and glass caustics.'
    },
    {
      id: 'v4',
      title: 'Lemon Juice',
      category: 'Food & Beverage',
      videoSrc: 'Lemon juise.mp4',
      poster: 'thumbnails/lemon_juice.jpeg',
      desc: 'Hyper-fluid beverage commercial with macro droplets, ice refraction, and cinematic pour dynamics.'
    },
    {
      id: 'v5',
      title: 'Jewellery Commercial',
      category: 'Fashion & Jewelry',
      videoSrc: 'Jwellery commercial.mp4',
      poster: 'thumbnails/jewelry.jpeg',
      desc: 'Exquisite cinematic commercial showcasing fine jewelry craftsmanship, brilliant light refractions, and precious stones.'
    },
    {
      id: 'v6',
      title: 'Perfume',
      category: 'Perfume',
      videoSrc: 'Perfume .mp4',
      poster: 'thumbnails/perfume_alt.jpeg',
      desc: 'Sensory fragrance commercial exploring floral notes, warm amber lighting, and elegant liquid motion.'
    },
    {
      id: 'v7',
      title: 'UGC',
      category: 'Food',
      videoSrc: 'UGC video.mp4',
      poster: 'thumbnails/ugc_video.jpg',
      desc: 'High-energy vertical UGC commercial designed for TikTok and Instagram Reels with rapid pacing and authentic hooks.'
    },
    {
      id: 'v8',
      title: 'Architect AI Villa',
      category: 'Architecture',
      videoSrc: 'AI villa edit.mp4',
      poster: 'thumbnails/ai_villa.png',
      desc: 'Photorealistic AI architectural walkthrough with cinematic twilight atmosphere and monumental concrete geometry.'
    }
  ];

  // Additional Commercial Videos for "See More" Expanded Gallery
  const newCommercialProjects = [
    {
      id: 'ext_v1',
      cat: 'food',
      tag: 'Food & Beverage',
      title: 'Dark Fantasy',
      videoSrc: 'Dark fantasy.mp4',
      poster: '',
      desc: 'Cinematic chocolate cookie commercial with rich molten core dynamics and fluid chocolate pours.'
    },
    {
      id: 'ext_v2',
      cat: ['ugc', 'tech'],
      tag: 'UGC Video',
      title: 'Unboxing UGC2',
      videoSrc: 'Unboxing UGC 2.mp4',
      poster: '',
      desc: 'Authentic creator-style unboxing video highlighting product reveal, tactile details, and modern social format.'
    },
    {
      id: 'ext_v3',
      cat: ['ugc', 'tech'],
      tag: 'Product Campaign',
      title: 'Product Unboxing',
      videoSrc: 'product unboxing.mp4',
      poster: '',
      desc: 'Cinematic product unboxing showcase capturing packaging reveal, tactile textures, and sleek presentation.'
    },
    {
      id: 'ext_v4',
      cat: 'tech',
      tag: 'Tech & Electronics',
      title: 'Keyboard',
      videoSrc: 'Keyboard.mp4',
      poster: '',
      desc: 'High-performance mechanical keyboard advertisement showcasing tactile key switches, anodized chassis, and lighting.'
    },
    {
      id: 'ext_v5',
      cat: ['luxury', 'fashion'],
      tag: 'Luxury Items',
      title: 'Luxury Watch',
      videoSrc: 'Luxury watch.mp4',
      poster: 'thumbnails/luxury_watch.jpeg',
      desc: 'High-horology timepiece commercial featuring intricate tourbillon movement, sapphire crystal refractions, and rose gold detailing.'
    },
    {
      id: 'ext_v6',
      cat: 'food',
      tag: 'Food & Beverage',
      title: 'Drink Hypermotion',
      videoSrc: 'Drink Hypermotion.mp4',
      poster: '',
      desc: 'Dynamic hypermotion beverage commercial with fluid splash physics, macro ice dynamics, and cinematic lighting.'
    },
    {
      id: 'ext_v7',
      cat: 'ugc',
      tag: 'UGC Video',
      title: 'UGC Unboxing',
      videoSrc: 'Unboxing UGC.mp4',
      poster: '',
      desc: 'High-converting social UGC unboxing review highlighting unboxing experience, texture, and product hook.'
    },
    {
      id: 'ext_v8',
      cat: 'fashion',
      tag: 'Fashion & Apparel',
      title: 'Fashion Clothing',
      videoSrc: 'Fashion clothing.mp4',
      poster: '',
      desc: 'High-fashion apparel commercial with editorial styling, fluid fabric motion, and contemporary aesthetic.'
    },
    {
      id: 'ext_v9',
      cat: 'food',
      tag: 'Food & Beverage',
      title: 'Yoga Bar',
      videoSrc: 'Yoga bar.mp4',
      poster: '',
      desc: 'Healthy energy bar commercial capturing natural whole grains, honey drizzle, and wholesome outdoor vitality.'
    }
  ];

  // Photography Database for Categorized Gallery Modal
  const photographyProjects = [
    { cat: 'fashion', title: 'Studio Portrait', tag: 'Fashion & Jewelry', img: 'All Photos/Hyper realistic.png' },
    { cat: 'fashion', title: 'Contemporary Apparel', tag: 'Fashion & Jewelry', img: 'All Photos/clothing 1.jpeg' },
    { cat: 'fashion', title: 'Footwear Design', tag: 'Fashion & Jewelry', img: 'All Photos/shoes.jpeg' },
    { cat: 'fashion', title: 'Editorial Model', tag: 'Fashion & Jewelry', img: 'All Photos/Hyper realistic 3.png' },
    { cat: 'fashion', title: 'Urban Silhouette', tag: 'Fashion & Jewelry', img: 'All Photos/clothing 2.jpeg' },
    { cat: 'fashion', title: 'Street Candid', tag: 'Fashion & Jewelry', img: 'All Photos/fashion candit.png' },
    { cat: 'luxury', title: 'Diamond Solitaire', tag: 'Luxury Items', img: 'All Photos/Ring.jpeg' },
    { cat: 'luxury', title: 'Oud Ameer Perfume', tag: 'Luxury Items', img: 'All Photos/oud ameer.jpeg' },
    { cat: 'luxury', title: 'Royal Jewellery', tag: 'Luxury Items', img: 'All Photos/Jwellery 2.png' },
    { cat: 'luxury', title: 'Diamond Necklace', tag: 'Luxury Items', img: 'All Photos/Jwellery 1.png' },
    { cat: 'beauty', title: 'Beauty Portrait', tag: 'Beauty & Makeup', img: 'All Photos/Hyper realistic 2.png' },
    { cat: 'beauty', title: 'Chemist at Play', tag: 'Beauty & Makeup', img: 'All Photos/Camist&play.jpeg' },
    { cat: 'food', title: 'Citrus Splash', tag: 'Food & Beverage', img: 'All Photos/soft drink.png' },
    { cat: 'food', title: 'Dark Fantasy', tag: 'Food & Beverage', img: 'All Photos/Dark fantasy.jpeg' }
  ];

  // State
  const images = new Array(FRAME_COUNT + 1);
  let loadedCount = 0;
  let targetFrame = 1;
  let currentRenderedFrame = 1;
  let isLoaderDismissed = false;
  let heroScrollTrigger = null;
  let heroPinTrigger = null;
  let heroScrubTrigger = null;

  const MOBILE_BREAKPOINT = 768;
  const isMobileLayout = () => window.innerWidth <= MOBILE_BREAKPOINT;

  // Format frame file path
  function getFramePath(index) {
    const num = String(index).padStart(4, '0');
    const sec = ((index - 1) * 0.1).toFixed(2);
    return `${encodeURI(FOLDER_NAME)}/frame_${num}_${sec}s.png`;
  }

  // Preload frames
  function preloadFrames() {
    if (isMobileLayout()) {
      dismissLoader();
      return;
    }
    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    images[1] = firstImg;
    firstImg.onload = () => {
      loadedCount++;
      updateLoader();
      resizeCanvas();
      renderFrame(1);
      loadRemainingFrames();
    };
    firstImg.onerror = () => {
      console.warn('Failed to load initial frame:', firstImg.src);
      loadRemainingFrames();
    };
  }

  function loadRemainingFrames() {
    for (let i = 2; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      images[i] = img;

      img.onload = () => {
        loadedCount++;
        updateLoader();
      };
      img.onerror = () => {
        loadedCount++;
        updateLoader();
      };
    }
  }

  function dismissLoader() {
    if (isLoaderDismissed) return;
    isLoaderDismissed = true;
    preloader.classList.add('hidden');
    initHeroScrollPin();
    initScrollAnimations();
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
    updateActiveNav();
  }

  function updateLoader() {
    const pct = Math.min(100, Math.round((loadedCount / FRAME_COUNT) * 100));
    loaderPercent.textContent = `${pct}%`;
    loaderBar.style.width = `${pct}%`;
    if (loaderStatus) {
      if (pct < 40) loaderStatus.textContent = 'Buffering Frames...';
      else if (pct < 90) loaderStatus.textContent = 'Syncing AI Models...';
      else loaderStatus.textContent = 'Ready';
    }

    if (loadedCount >= FRAME_COUNT) {
      setTimeout(dismissLoader, 350);
    }
  }

  // Canvas Sizing & Retina scaling
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    renderFrame(Math.round(currentRenderedFrame));
  }

  // Render Frame with Aspect Cover Math & Nearest-Frame Fallback
  function renderFrame(frameIndex) {
    const clampedIndex = Math.max(1, Math.min(FRAME_COUNT, Math.round(frameIndex)));
    let img = images[clampedIndex];

    // Nearest loaded frame fallback to prevent blank canvas during scrub
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < FRAME_COUNT; offset++) {
        const prev = clampedIndex - offset;
        if (prev >= 1 && images[prev] && images[prev].complete && images[prev].naturalWidth > 0) {
          img = images[prev];
          break;
        }
        const next = clampedIndex + offset;
        if (next <= FRAME_COUNT && images[next] && images[next].complete && images[next].naturalWidth > 0) {
          img = images[next];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cW = canvas.width;
    const cH = canvas.height;
    ctx.clearRect(0, 0, cW, cH);

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const hRatio = cW / imgW;
    const vRatio = cH / imgH;
    const ratio = Math.max(hRatio, vRatio);

    const drawW = imgW * ratio;
    const drawH = imgH * ratio;
    const drawX = (cW - drawW) / 2;
    const drawY = (cH - drawH) / 2;

    ctx.drawImage(img, 0, 0, imgW, imgH, drawX, drawY, drawW, drawH);
  }

  /**
   * GSAP ScrollTrigger Hero Scroll-Pin Engine (2-Phase Architecture):
   * Phase 1 (PINNED):
   *   Hero stays pinned while scrubbing through the first 50% of frames (1 -> 41).
   * Phase 2 (UNPINNED):
   *   Hero unpins, page scrolls normally into Showreel and beyond.
   *   Second ScrollTrigger continues scrubbing the remaining 50% of frames (41 -> 81)
   *   scroll-linked in the background over additional scroll distance, then holds on frame 81.
   *
   * On Mobile Screens (<= 768px):
   *   Animation is disabled entirely. Static hero image is displayed without pinning.
   */
  function initHeroScrollPin() {
    if (isMobileLayout()) {
      if (heroPinTrigger) {
        heroPinTrigger.kill();
        heroPinTrigger = null;
      }
      if (heroScrubTrigger) {
        heroScrubTrigger.kill();
        heroScrubTrigger = null;
      }
      heroScrollTrigger = null;
      if (heroTrack) {
        heroTrack.style.height = '';
        heroTrack.style.position = '';
        const stage = heroTrack.querySelector('.hero-sticky-stage');
        if (stage) {
          stage.style.position = '';
          stage.style.height = '';
        }
      }
      return;
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      if (heroPinTrigger) {
        heroPinTrigger.kill();
        heroPinTrigger = null;
      }
      if (heroScrubTrigger) {
        heroScrubTrigger.kill();
        heroScrubTrigger = null;
      }

      // Responsive distances:
      // Phase 1 (pinned): ~0.85x viewport height
      const getPinDistance = () => Math.min(1100, Math.max(600, Math.round(window.innerHeight * 0.85)));
      // Phase 2 (unpinned): ~0.95x viewport height
      const getUnpinnedDistance = () => Math.min(1200, Math.max(700, Math.round(window.innerHeight * 0.95)));

      const midFrame = 1 + Math.round(0.5 * (FRAME_COUNT - 1)); // Frame 41

      // 1. PINNED PHASE: First 50% of animation (Frames 1 to 41)
      heroPinTrigger = ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: () => `+=${getPinDistance()}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.1,
        fastScrollEnd: true,
        preventOverlaps: true,
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress));
          const frameIndex = 1 + Math.round(p * (midFrame - 1));
          targetFrame = Math.max(1, Math.min(midFrame, frameIndex));
          currentRenderedFrame = targetFrame;
          renderFrame(targetFrame);
        }
      });

      // 2. UNPINNED PHASE: Remaining 50% of animation (Frames 41 to 81)
      // Continues immediately after the pin releases, without pin, as page scrolls normally
      heroScrubTrigger = ScrollTrigger.create({
        trigger: '#hero',
        start: () => (heroPinTrigger ? heroPinTrigger.end : getPinDistance()),
        end: () => `+=${getUnpinnedDistance()}`,
        scrub: 0.1,
        onUpdate: (self) => {
          if (self.progress > 0) {
            const p = Math.max(0, Math.min(1, self.progress));
            const frameIndex = midFrame + Math.round(p * (FRAME_COUNT - midFrame));
            targetFrame = Math.max(midFrame, Math.min(FRAME_COUNT, frameIndex));
            currentRenderedFrame = targetFrame;
            renderFrame(targetFrame);
          } else if (self.direction === -1 && self.progress <= 0) {
            targetFrame = midFrame;
            currentRenderedFrame = targetFrame;
            renderFrame(targetFrame);
          }
        }
      });

      heroScrollTrigger = heroPinTrigger;
    } else {
      // Graceful fallback for non-GSAP environments
      if (heroTrack) {
        heroTrack.style.height = '200vh';
        const stage = heroTrack.querySelector('.hero-sticky-stage');
        if (stage) stage.style.position = 'sticky';
      }
    }
  }

  // Render Loop (Desktop only)
  function animationLoop() {
    if (!heroScrollTrigger && !isMobileLayout()) {
      const delta = (targetFrame - currentRenderedFrame) * 0.35;
      currentRenderedFrame += delta;

      if (Math.abs(targetFrame - currentRenderedFrame) < 0.05) {
        currentRenderedFrame = targetFrame;
      }

      renderFrame(Math.round(currentRenderedFrame));
    }
    requestAnimationFrame(animationLoop);
  }

  // Scroll Handler (Fallback scrubbing + Throttled Active Nav Detection)
  let isNavTicking = false;

  function onScroll() {
    // Only scrub canvas frames on desktop fallback when not using GSAP ScrollTrigger
    if (!heroScrollTrigger && !isMobileLayout()) {
      const scrollY = window.scrollY;
      const heroHeight = heroTrack ? heroTrack.offsetHeight : window.innerHeight;
      const heroScrollDistance = heroHeight - window.innerHeight;

      if (heroScrollDistance > 0) {
        if (scrollY <= heroScrollDistance) {
          const progress = Math.max(0, Math.min(1, scrollY / heroScrollDistance));
          targetFrame = 1 + Math.round(progress * (FRAME_COUNT - 1));
        } else {
          targetFrame = FRAME_COUNT;
        }
        currentRenderedFrame = targetFrame;
        renderFrame(targetFrame);
      }
    }

    // 1. Throttled with requestAnimationFrame for maximum performance
    if (!isNavTicking) {
      requestAnimationFrame(() => {
        updateActiveNav();
        isNavTicking = false;
      });
      isNavTicking = true;
    }
  }

  // =========================================================================
  // NAV BAR ACTIVE-LINK TRACKING (Direct Viewport Center Point Detection)
  // Calculates vertical center point: window.innerHeight / 2 + window.scrollY
  // =========================================================================
  let currentActiveNav = null;

  function setActiveNavLink(targetId) {
    if (currentActiveNav === targetId) return;
    currentActiveNav = targetId;

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (targetId && href === `#${targetId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    console.log(`[Nav Active] Center point detected section: ${targetId}`);
  }

  function updateActiveNav() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Vertical CENTER point of the viewport in document coordinates
    const viewportCenter = scrollY + windowHeight / 2;

    const workEl = document.getElementById('work');
    const faqEl = document.getElementById('faq');
    const contactEl = document.getElementById('contact');

    if (!workEl || !faqEl || !contactEl) return;

    // Actual top positions on the page via getBoundingClientRect() + scrollY
    const workTop = workEl.getBoundingClientRect().top + scrollY;
    const faqTop = faqEl.getBoundingClientRect().top + scrollY;
    const contactTop = contactEl.getBoundingClientRect().top + scrollY;

    let activeNav = 'hero';

    // 1. Scrolled near/to the very bottom of the document -> Contact is active
    if (scrollY + windowHeight >= docHeight - 40) {
      activeNav = 'contact';
    } else if (viewportCenter >= contactTop) {
      activeNav = 'contact';
    } else if (viewportCenter >= faqTop) {
      activeNav = 'faq';
    } else if (viewportCenter >= workTop) {
      activeNav = 'work';
    } else {
      activeNav = 'hero';
    }

    setActiveNavLink(activeNav);
  }

  // Smooth click handler with instant active state
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        setActiveNavLink(targetId);
      }
    });
  });

  // Site-Wide Scroll-Reveal Animations (GSAP ScrollTrigger + Fallback)
  function initScrollAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const revealGroups = document.querySelectorAll('.section-block');
      revealGroups.forEach(section => {
        const items = section.querySelectorAll('.reveal-item');
        if (!items.length) return;

        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            stagger: 0.12,
            clearProps: 'transform',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              once: true
            }
          }
        );
      });
    } else {
      // IntersectionObserver fallback if GSAP is unavailable
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el));
    }
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Optional: Close all other open items
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('active')) {
          other.classList.remove('active');
          other.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-content').style.maxHeight = null;
        }
      });

      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      }
    });
  });

  // Video Modal / Lightbox
  function openVideoModal(video) {
    modalActiveVideo.src = video.videoSrc;
    modalActiveVideo.poster = video.poster || '';
    modalVideoTitle.textContent = video.title;
    modalVideoCat.textContent = video.category || video.tag || 'Commercial Reel';

    // Populate shelf with all commercial projects
    modalShelfItems.innerHTML = '';
    const allProjects = [...videoProjects, ...newCommercialProjects];
    allProjects.forEach(v => {
      const thumb = document.createElement('div');
      thumb.className = `shelf-thumb-item ${v.id === video.id ? 'active' : ''}`;
      if (v.poster) {
        thumb.innerHTML = `<img src="${v.poster}" alt="${v.title}">`;
      } else {
        thumb.innerHTML = `<video src="${v.videoSrc}#t=0.1" muted playsinline preload="metadata" style="width:100%;height:100%;object-fit:cover;pointer-events:none;"></video>`;
      }
      thumb.title = v.title;
      thumb.addEventListener('click', () => openVideoModal(v));
      modalShelfItems.appendChild(thumb);
    });

    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalActiveVideo.play().catch(() => {});
  }

  function closeVideoModal() {
    videoModal.classList.remove('active');
    modalActiveVideo.pause();
    modalActiveVideo.src = '';
    if (commercialsModal && commercialsModal.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  // Hover-to-Play Video Preview for Bento Grid (Wired & Ready)
  const bentoSlots = document.querySelectorAll('.showreel-bento-grid .bento-slot');
  bentoSlots.forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;

    let playPromise = null;

    card.addEventListener('mouseenter', () => {
      const hasSrc = video.getAttribute('src') || video.currentSrc || video.querySelector('source[src]');
      if (!hasSrc) return;

      video.muted = true;
      card.classList.add('is-playing');
      playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('is-playing');
      const hasSrc = video.getAttribute('src') || video.currentSrc || video.querySelector('source[src]');
      if (!hasSrc) return;

      if (playPromise !== undefined && playPromise !== null) {
        playPromise.then(() => {
          video.pause();
          video.currentTime = 0;
          try { video.load(); } catch (e) {}
        }).catch(() => {
          video.pause();
          video.currentTime = 0;
          try { video.load(); } catch (e) {}
        });
      } else {
        video.pause();
        video.currentTime = 0;
        try { video.load(); } catch (e) {}
      }
    });
  });

  // Bind bento slots in showreel
  bentoSlots.forEach((card, idx) => {
    card.addEventListener('click', () => {
      // Pause and reset all thumbnail previews when modal opens
      document.querySelectorAll('.showreel-bento-grid .bento-slot video').forEach(v => {
        v.pause();
        v.currentTime = 0;
        try { v.load(); } catch (e) {}
      });
      const vidElem = card.querySelector('video');
      const vidSrc = vidElem ? vidElem.getAttribute('src') : null;
      const videoData = (vidSrc && videoProjects.find(p => p.videoSrc === vidSrc)) || videoProjects[idx] || videoProjects[0];
      if (videoData) {
        openVideoModal(videoData);
      }
    });
  });

  if (btnSeeMoreVideos) {
    btnSeeMoreVideos.addEventListener('click', openCommercialsModal);
  }

  if (btnCloseVideoModal) {
    btnCloseVideoModal.addEventListener('click', closeVideoModal);
  }

  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });

  // Pinterest-Style Dynamic Masonry Column Packing for Showreel Grid
  function initShowreelMasonry() {
    const container = document.querySelector('.showreel-masonry-grid');
    if (!container) return;
    const items = Array.from(container.querySelectorAll('.bento-slot'));
    if (!items.length) return;

    function layoutMasonry() {
      const containerWidth = container.clientWidth;
      if (containerWidth <= 0) return;

      const windowWidth = window.innerWidth;
      if (windowWidth <= 768) {
        container.classList.remove('masonry-initialized');
        container.style.position = '';
        container.style.height = '';
        items.forEach(item => {
          item.style.position = '';
          item.style.top = '';
          item.style.left = '';
          item.style.width = '';
          item.style.height = '';
        });
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
        return;
      }

      let cols = 4;
      let gap = 12;

      if (windowWidth <= 960) {
        cols = 2;
        gap = 12;
      }

      container.classList.add('masonry-initialized');
      container.style.position = 'relative';

      const colWidth = (containerWidth - (cols - 1) * gap) / cols;
      const colHeights = new Array(cols).fill(0);

      items.forEach(item => {
        const isHero = item.classList.contains('tile-hero');
        const isVert = item.classList.contains('tile-vertical');
        const isLemon = item.classList.contains('tile-lemon-featured');

        // Hero and Lemon Juice span 2 columns on desktop/tablet
        const span = ((isHero || isLemon) && cols >= 2) ? 2 : 1;
        const itemWidth = span === 2 ? Math.round(colWidth * 2 + gap) : Math.round(colWidth);

        let itemHeight;
        if (isHero) {
          itemHeight = Math.round(itemWidth * (9 / 16));
        } else if (isLemon) {
          // Sits cleanly between medium (180px) and large (334px): sleek widescreen
          itemHeight = cols >= 4 ? Math.round(itemWidth * 0.43) : Math.round(itemWidth * 0.44);
        } else if (isVert) {
          // Modestly smaller vertical cards: tight, refined ~3:4 aspect
          itemHeight = Math.round(itemWidth * 1.32);
        } else {
          // Normal horizontal
          itemHeight = cols >= 4 ? Math.round(itemWidth * 0.62) : Math.round(itemWidth * (9 / 16));
        }

        let targetCol = 0;
        if (span === 1) {
          let minH = colHeights[0];
          for (let c = 1; c < cols; c++) {
            if (colHeights[c] < minH) {
              minH = colHeights[c];
              targetCol = c;
            }
          }
        } else {
          let minMaxH = Math.max(...colHeights.slice(0, span));
          targetCol = 0;
          for (let c = 1; c <= cols - span; c++) {
            const m = Math.max(...colHeights.slice(c, c + span));
            if (m < minMaxH) {
              minMaxH = m;
              targetCol = c;
            }
          }
        }

        const top = span === 1 ? colHeights[targetCol] : Math.max(...colHeights.slice(targetCol, targetCol + span));
        const left = Math.round(targetCol * (colWidth + gap));

        item.style.position = 'absolute';
        item.style.top = `${top}px`;
        item.style.left = `${left}px`;
        item.style.width = `${itemWidth}px`;
        item.style.height = `${itemHeight}px`;

        const newH = top + itemHeight + gap;
        for (let c = targetCol; c < targetCol + span; c++) {
          colHeights[c] = newH;
        }
      });

      const totalHeight = Math.max(...colHeights) - gap;
      container.style.height = `${totalHeight}px`;

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }

    layoutMasonry();

    window.addEventListener('resize', () => {
      requestAnimationFrame(layoutMasonry);
    });

    window.addEventListener('load', layoutMasonry);

    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => {
        layoutMasonry();
      });
      ro.observe(container);
    }
  }

  initShowreelMasonry();

  // Pinterest-Style Dynamic Masonry Column Packing for Photography Grid (Explicit Medium Constraints)
  function initPhotoMasonry() {
    const container = document.querySelector('.photo-masonry-grid');
    if (!container) return;
    const items = Array.from(container.querySelectorAll('.photo-slot'));
    if (!items.length) return;

    function layoutMasonry() {
      const containerWidth = container.clientWidth;
      if (containerWidth <= 0) return;

      const windowWidth = window.innerWidth;
      let cols = 4;
      let gap = 12;

      if (windowWidth <= 600) {
        cols = 2; // 2 compact columns on mobile
        gap = 10;
      } else if (windowWidth <= 960) {
        cols = 3; // 3 columns on tablet
        gap = 12;
      } else {
        cols = 4; // 4 columns on desktop (each tile ~280-300px wide)
        gap = 12;
      }

      container.classList.add('masonry-initialized');
      container.style.position = 'relative';

      // Width per column, capped at 310px max (Instruction 1: no tile exceeds roughly 280-320px wide)
      const rawColWidth = (containerWidth - (cols - 1) * gap) / cols;
      const colWidth = Math.min(310, Math.floor(rawColWidth));
      const colHeights = new Array(cols).fill(0);

      items.forEach(item => {
        const isTall = item.classList.contains('photo-tile-tall');
        const isCompact = item.classList.contains('photo-tile-compact');

        const itemWidth = colWidth;
        let itemHeight;
        if (isCompact) {
          itemHeight = 210;
        } else if (isTall) {
          itemHeight = 320;
        } else {
          itemHeight = 260; // medium
        }

        // Explicit height bounds constraint (200px - 350px range)
        itemHeight = Math.max(200, Math.min(350, itemHeight));

        let targetCol = 0;
        let minH = colHeights[0];
        for (let c = 1; c < cols; c++) {
          if (colHeights[c] < minH) {
            minH = colHeights[c];
            targetCol = c;
          }
        }

        const top = colHeights[targetCol];
        const left = Math.round(targetCol * (colWidth + gap));

        item.style.position = 'absolute';
        item.style.top = `${top}px`;
        item.style.left = `${left}px`;
        item.style.width = `${itemWidth}px`;
        item.style.height = `${itemHeight}px`;

        colHeights[targetCol] = top + itemHeight + gap;
      });

      const totalHeight = Math.max(...colHeights) - gap;
      container.style.height = `${totalHeight}px`;

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }

    layoutMasonry();

    window.addEventListener('resize', () => {
      requestAnimationFrame(layoutMasonry);
    });

    window.addEventListener('load', layoutMasonry);

    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => {
        layoutMasonry();
      });
      ro.observe(container);
    }
  }

  initPhotoMasonry();

  // Photo Lightbox Modal Expand-On-Click
  const photoLightboxModal = document.getElementById('photo-lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxChip = document.getElementById('lightbox-chip');
  const lightboxChipLabel = document.getElementById('lightbox-chip-label');
  const lightboxChipIcon = document.getElementById('lightbox-chip-icon');
  const btnClosePhotoModal = document.getElementById('btn-close-photo-modal');

  const photoCatIcons = {
    'Fashion': '<svg class="cat-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    'Luxury': '<svg class="cat-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M11 3L8 9l4 12 4-12-3-6"/><path d="M2 9h20"/></svg>',
    'Beauty': '<svg class="cat-svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>',
    'Food': '<svg class="cat-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>'
  };

  function openPhotoLightbox(src, title, cat) {
    if (!photoLightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = title || 'Expanded photo';
    if (lightboxTitle) lightboxTitle.textContent = title || '';
    if (lightboxChipLabel) lightboxChipLabel.textContent = cat || 'Studio';
    if (lightboxChipIcon) {
      lightboxChipIcon.innerHTML = photoCatIcons[cat] || '';
    }
    photoLightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePhotoLightbox() {
    if (!photoLightboxModal) return;
    photoLightboxModal.classList.remove('active');
    document.body.style.overflow = '';
    if (lightboxImg) lightboxImg.src = '';
  }

  document.querySelectorAll('.photo-slot').forEach(slot => {
    slot.addEventListener('click', () => {
      const src = slot.getAttribute('data-photo-src');
      const title = slot.getAttribute('data-title');
      const cat = slot.getAttribute('data-cat');
      openPhotoLightbox(src, title, cat);
    });
  });

  if (btnClosePhotoModal) {
    btnClosePhotoModal.addEventListener('click', closePhotoLightbox);
  }

  if (photoLightboxModal) {
    photoLightboxModal.addEventListener('click', (e) => {
      if (e.target === photoLightboxModal) closePhotoLightbox();
    });
  }

  // Photography Gallery Modal
  function renderGalleryItems(filter = 'all') {
    modalGalleryGrid.innerHTML = '';
    const filtered = filter === 'all' 
      ? photographyProjects 
      : photographyProjects.filter(p => p.cat === filter);

    filtered.forEach(item => {
      const el = document.createElement('div');
      el.className = 'gallery-item';
      el.style.cursor = 'pointer';
      el.innerHTML = `
        <img src="${item.img}" alt="${item.title}" loading="lazy">
        <div class="gallery-item-caption mono">${item.tag} — ${item.title}</div>
      `;
      el.addEventListener('click', () => {
        openPhotoLightbox(item.img, item.title, item.tag.split(' ')[0]);
      });
      modalGalleryGrid.appendChild(el);
    });
  }

  function openGalleryModal() {
    renderGalleryItems('all');
    galleryTabs.forEach(t => t.classList.toggle('active', t.dataset.filter === 'all'));
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeGalleryModal() {
    galleryModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (btnSeeMorePhotos) {
    btnSeeMorePhotos.addEventListener('click', openGalleryModal);
  }

  if (btnCloseGalleryModal) {
    btnCloseGalleryModal.addEventListener('click', closeGalleryModal);
  }

  galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) closeGalleryModal();
  });

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderGalleryItems(tab.dataset.filter);
    });
  });

  // Commercials Gallery Modal (Expanded "See More" View)
  function renderCommercialItems(filter = 'all') {
    if (!modalCommercialsGrid) return;
    modalCommercialsGrid.innerHTML = '';
    const filtered = filter === 'all'
      ? newCommercialProjects
      : newCommercialProjects.filter(p => {
          if (Array.isArray(p.cat)) return p.cat.includes(filter);
          return p.cat === filter;
        });

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'gallery-video-item';
      card.innerHTML = `
        <video src="${item.videoSrc}#t=0.1" ${item.poster ? `poster="${item.poster}"` : ''} muted loop playsinline preload="metadata"></video>
        <div class="gallery-video-play-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><polygon points="6 3 20 12 6 21 6 3"/></svg>
        </div>
        <div class="gallery-video-caption">
          <span class="gallery-video-tag mono">${item.tag}</span>
          <span class="gallery-video-title">${item.title}</span>
        </div>
      `;

      const video = card.querySelector('video');
      let playPromise = null;

      card.addEventListener('mouseenter', () => {
        if (!video) return;
        video.muted = true;
        playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      });

      card.addEventListener('mouseleave', () => {
        if (!video) return;
        if (playPromise !== undefined && playPromise !== null) {
          playPromise.then(() => {
            video.pause();
            video.currentTime = 0.1;
          }).catch(() => {
            video.pause();
            video.currentTime = 0.1;
          });
        } else {
          video.pause();
          video.currentTime = 0.1;
        }
      });

      card.addEventListener('click', () => {
        if (video) {
          video.pause();
          video.currentTime = 0.1;
        }
        openVideoModal(item);
      });

      modalCommercialsGrid.appendChild(card);
    });
  }

  function openCommercialsModal() {
    if (!commercialsModal) return;
    renderCommercialItems('all');
    if (commercialsTabs) {
      commercialsTabs.forEach(t => t.classList.toggle('active', t.dataset.filter === 'all'));
    }
    commercialsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCommercialsModal() {
    if (!commercialsModal) return;
    commercialsModal.classList.remove('active');
    document.body.style.overflow = '';
    if (modalCommercialsGrid) {
      modalCommercialsGrid.querySelectorAll('video').forEach(v => {
        v.pause();
        v.currentTime = 0.1;
      });
    }
  }

  if (btnCloseCommercialsModal) {
    btnCloseCommercialsModal.addEventListener('click', closeCommercialsModal);
  }

  if (commercialsModal) {
    commercialsModal.addEventListener('click', (e) => {
      if (e.target === commercialsModal) closeCommercialsModal();
    });
  }

  if (commercialsTabs) {
    commercialsTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        commercialsTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderCommercialItems(tab.dataset.filter);
      });
    });
  }

  // Calendly Placeholder Handler
  const btnOpenCalendly = document.getElementById('btn-open-calendly');
  if (btnOpenCalendly) {
    btnOpenCalendly.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://wa.me/918209856985?text=Hi%20Alfaiz,%20I%20would%20like%20to%20book%20a%20call%20for%20a%20cinematic%20AI%20commercial.', '_blank');
    });
  }

  // Keyboard Shortcuts (Esc to close modals)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (videoModal && videoModal.classList.contains('active')) closeVideoModal();
      if (galleryModal && galleryModal.classList.contains('active')) closeGalleryModal();
      if (commercialsModal && commercialsModal.classList.contains('active')) closeCommercialsModal();
      if (photoLightboxModal && photoLightboxModal.classList.contains('active')) closePhotoLightbox();
    }
  });

  // Event Listeners
  window.addEventListener('resize', () => {
    if (!isMobileLayout() && loadedCount === 0) {
      preloadFrames();
    }
    resizeCanvas();
    initHeroScrollPin();
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
    updateActiveNav();
  });
  window.addEventListener('scroll', onScroll, { passive: true });

  // Init Engine
  if (isMobileLayout()) {
    dismissLoader();
  } else {
    resizeCanvas();
    preloadFrames();
    initHeroScrollPin();
  }
  updateActiveNav();
  requestAnimationFrame(animationLoop);

  // Safety fallback: reveal page after 1.2s
  setTimeout(dismissLoader, 1200);
});
