document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Navbar Dynamic Color Shift ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- 2. Kinetic Floating Ambient Background Particles System ---
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = 25;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 12 + 8}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;

            particlesContainer.appendChild(particle);
        }
    }

    // --- 3. Interactive Luxury Product Carousel / Slider Engine ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.control-dot');
    const labelTrack = document.getElementById('current-label');

    if (slides.length > 0 && dots.length > 0 && labelTrack) {
        const categories = ["Sneakers", "Gym Gear", "Streetwear"];
        let currentSlide = 0;
        let slideInterval;

        function changeSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');

            const activeImg = slides[currentSlide].querySelector('img');
            if (activeImg) activeImg.style.transform = 'translate3d(0,0,0) rotateY(0)';

            currentSlide = index;

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            labelTrack.textContent = categories[currentSlide];
        }

        function nextSlide() {
            let next = (currentSlide + 1) % slides.length;
            changeSlide(next);
        }

        function startAutoplay() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoplay() {
            clearInterval(slideInterval);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoplay();
                changeSlide(index);
                startAutoplay();
            });
        });

        startAutoplay();

        // --- 4. Advanced 3D Parallax Mouse Tracking Interaction ---
        const visualFrame = document.getElementById('visual-container');
        if (visualFrame) {
            visualFrame.addEventListener('mousemove', (e) => {
                const activeSlide = slides[currentSlide];
                const targetImage = activeSlide ? activeSlide.querySelector('img') : null;
                if (!targetImage) return;

                const rect = visualFrame.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const normalizeX = (x / rect.width) - 0.5;
                const normalizeY = (y / rect.height) - 0.5;

                const rotateX = normalizeY * -25;
                const rotateY = normalizeX * 35;
                const shiftX = normalizeX * 20;
                const shiftY = normalizeY * 10;

                targetImage.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 40px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            visualFrame.addEventListener('mouseleave', () => {
                if (slides[currentSlide]) {
                    const targetImage = slides[currentSlide].querySelector('img');
                    if (targetImage) {
                        targetImage.style.transform = 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)';
                    }
                }
            });
        }
    }
});

// --- 5. Interactive Laboratory Blueprint HUD Cross-Link Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.trend-card');
    const nodes = document.querySelectorAll('.scan-node');
    const hudTitle = document.getElementById('hud-text-title');
    const hudDesc = document.getElementById('hud-text-desc');

    if (cards.length > 0 && nodes.length > 0 && hudTitle && hudDesc) {
        const techData = {
            sole: {
                title: "> MODULE_01 // QUANTUM MIDSOLE DIAGNOSIS",
                desc: "Status: OPTIMAL // Pressure profile parameters safely loaded. Nitrogen volume matrix structural distribution running at 100% compliance capacity metrics grid.",
                nodeClass: "node-sole"
            },
            upper: {
                title: "> MODULE_02 // AERO-WEAVE UPPER MATRIX",
                desc: "Status: ACTIVE // Aerated surface mesh density configuration running clear. Thermal dissipation threshold values standard. Structural protection lock enabled.",
                nodeClass: "node-upper"
            },
            lace: {
                title: "> MODULE_03 // TENSION CONTROL HARNESS",
                desc: "Status: CALIBRATED // Utility smart strapping adjustments locking parameters synchronized. Precision wrap support secure. Tension variance 0.00% detected.",
                nodeClass: "node-lace"
            }
        };

        function updateTechFocus(targetKey) {
            cards.forEach(c => c.classList.remove('active'));
            nodes.forEach(n => n.classList.remove('active'));

            const activeCard = document.querySelector(`.trend-card[data-target="${targetKey}"]`);
            const activeNode = document.querySelector(`.scan-node[data-node="${targetKey}"]`);

            if (activeCard) activeCard.classList.add('active');
            if (activeNode) activeNode.classList.add('active');

            hudTitle.textContent = techData[targetKey].title;
            hudDesc.textContent = techData[targetKey].desc;
        }

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const target = card.getAttribute('data-target');
                updateTechFocus(target);
            });
        });

        nodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                const target = node.getAttribute('data-node');
                updateTechFocus(target);
            });
        });
    }
});

// --- 6. Simple Auto-Decrement Timer Animation System ---
function runCyberCountdown() {
    let days = 2, hours = 14, minutes = 38, seconds = 59;
    const dayEl = document.getElementById('days');

    if (dayEl) {
        setInterval(() => {
            seconds--;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                    if (hours < 0) {
                        hours = 23;
                        days--;
                    }
                }
            }

            if (document.getElementById('days')) {
                document.getElementById('days').innerText = String(days).padStart(2, '0');
                document.getElementById('hours').innerText = String(hours).padStart(2, '0');
                document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
                document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
            }
        }, 1000);
    }
}
document.addEventListener("DOMContentLoaded", runCyberCountdown);

// --- 7. Shop Products Filtering System ---
document.addEventListener('DOMContentLoaded', () => {
    const brandCheckboxes = document.querySelectorAll('.brand-filter');
    const sizeButtons = document.querySelectorAll('.size-btn');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const productCards = document.querySelectorAll('.product-card');
    const counterDisplay = document.getElementById('sneaker-counter');
    const resetBtn = document.querySelector('.btn-clear-sneakers');

    if (productCards.length > 0) {
        let selectedSize = null;
        let selectedColor = 'all';

        function runSneakerFilter() {
            let activeBrands = [];
            brandCheckboxes.forEach(cb => {
                if (cb.checked && cb.value !== 'all') activeBrands.push(cb.value);
            });

            const allCheckbox = document.querySelector('.brand-filter[value="all"]');
            const isAllBrandsChecked = allCheckbox ? allCheckbox.checked : true;

            let matchCount = 0;

            productCards.forEach(card => {
                const cardBrand = card.getAttribute('data-brand');
                const cardColor = card.getAttribute('data-color');
                const cardSizes = card.getAttribute('data-sizes') ? card.getAttribute('data-sizes').split(',') : [];

                const matchesBrand = isAllBrandsChecked || activeBrands.length === 0 || activeBrands.includes(cardBrand);
                const matchesColor = selectedColor === 'all' || cardColor === selectedColor;
                const matchesSize = !selectedSize || cardSizes.includes(selectedSize);

                if (matchesBrand && matchesColor && matchesSize) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    matchCount++;
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });

            if (counterDisplay) {
                counterDisplay.textContent = `SHOWING ${matchCount} UNITS`;
            }
        }

        brandCheckboxes.forEach(cb => {
            cb.addEventListener('change', (e) => {
                const allCheckbox = document.querySelector('.brand-filter[value="all"]');
                if (allCheckbox) {
                    if (e.target === allCheckbox && e.target.checked) {
                        brandCheckboxes.forEach(item => { if (item !== allCheckbox) item.checked = false; });
                    } else if (e.target !== allCheckbox && e.target.checked) {
                        allCheckbox.checked = false;
                    }
                    if (!Array.from(brandCheckboxes).some(item => item.checked)) allCheckbox.checked = true;
                }
                runSneakerFilter();
            });
        });

        sizeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('active')) {
                    btn.classList.remove('active');
                    selectedSize = null;
                } else {
                    sizeButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    selectedSize = btn.getAttribute('data-size');
                }
                runSneakerFilter();
            });
        });

        colorSwatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                colorSwatches.forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
                selectedColor = swatch.getAttribute('data-color');
                runSneakerFilter();
            });
        });

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                brandCheckboxes.forEach(cb => cb.checked = cb.value === 'all');
                sizeButtons.forEach(b => b.classList.remove('active'));
                colorSwatches.forEach(s => s.classList.remove('active'));
                const defSwatch = document.querySelector('.swatch-all');
                if (defSwatch) defSwatch.classList.add('active');

                selectedSize = null;
                selectedColor = 'all';
                runSneakerFilter();
            });
        }

        runSneakerFilter();
    }
});

// --- 8. High-End Translucent Auth Window Trigger Controller Matrix ---
document.addEventListener('DOMContentLoaded', () => {
    const authOverlay = document.getElementById('auth-overlay');
    const structuralBox = document.getElementById('auth-structural-box');
    const authCloseBtn = document.getElementById('auth-close-btn');

    const switchToSignupBtn = document.getElementById('switch-to-signup');
    const switchToLoginBtn = document.getElementById('switch-to-login');

    const loginTriggers = document.querySelectorAll('.link-login, [onclick*="OpenLoginPortal"]');
    const signupTriggers = document.querySelectorAll('.btn-signup, [onclick*="OpenSignupPortal"]');

    if (authOverlay && structuralBox) {

        function activateAuthPortal(targetMode) {
            if (targetMode === 'signup') {
                structuralBox.classList.add('state-signup-active');
            } else {
                structuralBox.classList.remove('state-signup-active');
            }
            authOverlay.classList.add('overlay-open');
            document.body.style.overflow = 'hidden';
        }

        function closeAuthPortal() {
            authOverlay.classList.remove('overlay-open');
            document.body.style.overflow = '';
        }

        loginTriggers.forEach(trigger => {
            if (trigger.hasAttribute('onclick')) trigger.removeAttribute('onclick');
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                activateAuthPortal('login');
            });
        });

        signupTriggers.forEach(trigger => {
            if (trigger.hasAttribute('onclick')) trigger.removeAttribute('onclick');
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                activateAuthPortal('signup');
            });
        });

        if (switchToSignupBtn) {
            switchToSignupBtn.addEventListener('click', () => {
                structuralBox.classList.add('state-signup-active');
            });
        }

        if (switchToLoginBtn) {
            switchToLoginBtn.addEventListener('click', () => {
                structuralBox.classList.remove('state-signup-active');
            });
        }

        if (authCloseBtn) {
            authCloseBtn.addEventListener('click', closeAuthPortal);
        }

        authOverlay.addEventListener('click', (e) => {
            if (e.target === authOverlay) {
                closeAuthPortal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && authOverlay.classList.contains('overlay-open')) {
                closeAuthPortal();
            }
        });
    }
});

// --- 9. Tactical Cyber Footer Intelligent Link Routing Matrix ---
document.addEventListener('DOMContentLoaded', () => {
    const cyberDatabase = {
        api: {
            title: "API_INTEGRATION_MANIFOLD",
            html: "<h5>COLOSSUS CORE API v2.4</h5><p>Integrate our inventory metrics directly into your personal setups. Pull tracking logs, drops timelines, and system allocations instantly via our webhooks.</p><div class='terminal-code-block'>GET /api/v2/drops/limited_manifest</div>"
        },
        tracking: {
            title: "SHIPMENT_LOGISTICS_PORTAL",
            html: "<h5>REALTIME REQUISITION MONITORING</h5><p>Please log in or initialize your passkey vector to scan active supply drops. Once verified, your node tracking credentials populate live routes here.</p>"
        },
        sizing: {
            title: "BLUEPRINT_DIMENSION_METRICS",
            html: "<h5>SIZING BLUEPRINTS</h5><p>Our gear is designed with high-output utility structures. For shoes, we recommend staying true to size. For tactical sportswear hoodies, sizes scale for a modern, slightly relaxed athletic overlay.</p>"
        },
        affiliate: {
            title: "AFFILIATE_NETWORK_SYNAPSE",
            html: "<h5>COMMUNITY SYNDICATE PROTOCOL</h5><p>Join the Colossus ecosystem. Spread access keys across your active social grids to earn high-margin commission allocations on successful sales.</p>"
        },
        encryption: {
            title: "DATA_ENCRYPTION_SAFEGUARD",
            html: "<h5>QUANTUM SHIELD METRICS</h5><p>All data pathways, address variables, and active checkouts use end-to-end aes-256-gcm hashing logic. Your authentication passkeys are safely stored off-grid.</p>"
        },
        terms: {
            title: "DEPLOYMENT_GOVERNANCE_TERMS",
            html: "<h5>TERMS & CORE CONDITIONS</h5><p>By interacting with the Colossus web platform, you agree to safely operate within global checkout security guidelines. Automated web scraping of limited drops is strictly rejected.</p>"
        },
        pay: {
            title: "SECURE_GATEWAY_CREDENTIALS",
            html: "<h5>INTEGRATED PAY SCANNERS</h5><p>We natively deploy secure transactions using top-tier credit tokens, crypto payment pathways, and verified web wallets. Checkout processing occurs through strict hardware verification blocks.</p>"
        },
        returns: {
            title: "RETURN_LOGISTICS_PROTOCOL",
            html: "<h5>REVERSED RETURN LOOPS</h5><p>Changed your mind? Return parameters remain active for exactly 30 days following delivery. Products must remain completely unworn with all asset tags intact.</p>"
        }
    };

    const infoModal = document.getElementById('footer-node-modal');
    const infoTitle = document.getElementById('footer-modal-title');
    const infoContent = document.getElementById('footer-modal-content');
    const infoCloseBtn = document.getElementById('footer-modal-close-btn');

    document.querySelectorAll('.footer-info-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const docKey = trigger.getAttribute('data-doc');

            if (cyberDatabase[docKey]) {
                infoTitle.textContent = cyberDatabase[docKey].title;
                infoContent.innerHTML = cyberDatabase[docKey].html;
                infoModal.classList.add('node-active');
            }
        });
    });

    if (infoCloseBtn && infoModal) {
        infoCloseBtn.addEventListener('click', () => infoModal.classList.remove('node-active'));
        infoModal.addEventListener('click', (e) => { e.target === infoModal && infoModal.classList.remove('node-active'); });
    }

    document.querySelectorAll('.footer-shop-filter').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetedFilterValue = link.getAttribute('data-filter');
            const targetShowcaseArea = document.getElementById('products') || document.querySelector('.products-section') || document.querySelector('main');

            if (targetShowcaseArea) {
                targetShowcaseArea.scrollIntoView({ behavior: 'smooth' });
            }

            const filterCheckbox = document.querySelector(`input[value="${targetedFilterValue}"]`);
            if (filterCheckbox) {
                filterCheckbox.checked = true;
                filterCheckbox.dispatchEvent(new Event('change'));
            } else if (typeof runSneakerFilter === 'function') {
                window.selectedCategory = targetedFilterValue;
                runSneakerFilter();
            }
        });
    });
});

// --- 10. Global Custom Animated Modal Engine ---
document.addEventListener('DOMContentLoaded', () => {
    const globalModal = document.getElementById('global-system-modal');
    const modalIconZone = document.getElementById('modal-icon-wrapper');
    const modalTitleText = document.getElementById('modal-title-text');
    const modalBodyText = document.getElementById('modal-body-text');
    const modalContinueBtn = document.getElementById('modal-continue-btn');

    let currentModalCallback = null;

    window.displaySystemModal = function (titleText, bodyText, statusType = 'success', resolutionCallback = null) {
        modalTitleText.textContent = titleText;
        modalBodyText.textContent = bodyText;
        currentModalCallback = resolutionCallback;

        modalIconZone.className = "modal-status-icon-zone";

        if (statusType === 'success') {
            modalIconZone.classList.add('status-success');
            modalIconZone.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
        } else {
            modalIconZone.classList.add('status-error');
            modalIconZone.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
        }

        globalModal.classList.add('modal-visible');
    };

    if (modalContinueBtn) {
        modalContinueBtn.addEventListener('click', () => {
            globalModal.classList.remove('modal-visible');
            if (currentModalCallback) {
                currentModalCallback();
                currentModalCallback = null;
            }
        });
    }

    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');

    if (menuToggleBtn && mobileMenuDrawer) {
        menuToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggleBtn.classList.toggle('toggle-active');
            mobileMenuDrawer.classList.toggle('menu-is-open');
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenuDrawer.contains(e.target) && !menuToggleBtn.contains(e.target)) {
                menuToggleBtn.classList.remove('toggle-active');
                mobileMenuDrawer.classList.remove('menu-is-open');
            }
        });
    }
});

// --- 11. Checkout Engine - Secure Outbound WhatsApp Order Dispatch Pipeline ---
const placeOrderBtn = document.getElementById('place-order-whatsapp-btn');

if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', function () {
        const form = document.getElementById('secure-checkout-intake-form');

        if (form && !form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const fullName = document.getElementById('checkout-fullName')?.value.trim() || 'N/A';
        const phone = document.getElementById('checkout-phone')?.value.trim() || 'N/A';
        const size = document.getElementById('checkout-size')?.value.trim() || 'N/A';
        const color = document.getElementById('checkout-color')?.value.trim() || 'N/A';
        const email = document.getElementById('checkout-email')?.value.trim() || 'N/A';
        const city = document.getElementById('checkout-city')?.value.trim() || 'N/A';
        const address = document.getElementById('checkout-address')?.value.trim() || 'N/A';

        const paymentElement = document.querySelector('input[name="paymentOption"]:checked');
        const paymentOption = paymentElement ? paymentElement.value : 'Not Selected';

        let txIdStr = '';
        if (paymentOption === 'EasyPaisa') {
            const txIdInput = document.getElementById('checkout-txId');
            const txId = txIdInput ? txIdInput.value.trim() : '';
            txIdStr = `\n🔹 *Transaction ID:* ${txId || 'Not Provided'}`;
        }

        const subtotal = document.getElementById('chk-subtotal')?.innerText || '$0.00';
        const shipping = document.getElementById('chk-shipping')?.innerText || '$0.00';
        const tax = document.getElementById('chk-tax')?.innerText || '$0.00';
        const grandTotal = document.getElementById('chk-grandtotal')?.innerText || '$0.00';

        const whatsappMessage =
            `🚨 *NEW ORDER MATRIX MANIFEST* 🚨\n\n` +
            `👤 *CUSTOMER DETAILS:*\n` +
            `• *Name:* ${fullName}\n` +
            `• *Phone:* ${phone}\n` +
            `• *Email:* ${email}\n\n` +
            `📦 *PRODUCT SPECS:*\n` +
            `• *Size:* ${size}\n` +
            `• *Color:* ${color}\n\n` +
            `📍 *DELIVERY LOGISTICS:*\n` +
            `• *City:* ${city}\n` +
            `• *Address:* ${address}\n\n` +
            `💳 *PAYMENT METRICS:*\n` +
            `• *Method:* ${paymentOption}${txIdStr}\n\n` +
            `💰 *BILLING LEDGER:*\n` +
            `• Sub-Total: ${subtotal}\n` +
            `• Shipping: ${shipping}\n` +
            `• Tax (10%): ${tax}\n` +
            `• *Grand Total:* ${grandTotal}\n\n` +
            `Please process this transaction sequence!`;

        const targetNumber = "923181561989";
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    });
}