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

// --- 7. Shop Products Filtering & Quick Add Pipeline ---
document.addEventListener('DOMContentLoaded', () => {
    const brandCheckboxes = document.querySelectorAll('.brand-filter');
    const sizeButtons = document.querySelectorAll('.size-btn');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const productCards = document.querySelectorAll('.product-card');
    const counterDisplay = document.getElementById('sneaker-counter');
    const resetBtn = document.querySelector('.btn-clear-sneakers');

    // ONLY execute if products exist on the current page
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

        // --- Quick Add Implementation Layer ---
        // --- Quick Add Implementation Layer (User-Isolated DB Stream) ---
        const quickAddButtons = document.querySelectorAll('.btn-quick-add');
        quickAddButtons.forEach(button => {
            button.addEventListener('click', async (event) => {
                const productCard = event.target.closest('.product-card');
                if (!productCard) return;

                // Extract authentic token parameters from storage
                const token = localStorage.getItem('userAuthToken');
                const userProfile = localStorage.getItem('userDataProfile');

                // Operational Guard: Check if user session handshake exists
                if (!token || !userProfile) {
                    displaySystemModal(
                        "✕ Authentication Required",
                        "Please login or establish an authorized account node to sync an item canvas with your private vault catalog.",
                        "error",
                        () => {
                            const authOverlayModal = document.getElementById('auth-overlay');
                            if (authOverlayModal) authOverlayModal.style.display = 'flex';
                        }
                    );
                    return;
                }

                // Compile structured metadata parameters from HTML metrics selectors
                const productId = productCard.getAttribute('data-id') || 'item-layer';
                const title = productCard.getAttribute('data-name') || 'Vault Item Specification';
                const price = parseFloat(productCard.getAttribute('data-price')) || 0.00;
                const imageUrl = productCard.getAttribute('data-img') || '../images/logo.jpeg';

                try {
                    // Dispatch item data frame securely to the user-specific database route
                    const response = await fetch('http://localhost:5000/api/cart/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ productId, title, price, imageUrl, quantity: 1 })
                    });

                    const data = await response.json();

                    if (response.ok) {
                        // Visual success confirmation handling loop
                        const originalInner = button.innerHTML;
                        button.innerHTML = 'ADDED <i class="fa-solid fa-check"></i>';
                        button.style.backgroundColor = '#b6ff00';
                        button.style.color = '#001B5E';

                        setTimeout(() => {
                            button.innerHTML = originalInner;
                            button.style.backgroundColor = '';
                            button.style.color = '';
                        }, 1200);
                    } else {
                        displaySystemModal("✕ Database Rejection", data.error || "The storage node rejected the incoming stream.", "error");
                    }
                } catch (err) {
                    console.error("WRITE DISCHARGE ERROR:", err);
                    displaySystemModal("✕ Pipeline Discharged", "Connection dropped mid-transit while contacting the core server database tables.", "error");
                }
            });
        });
    }
});

// --- 8. Dynamic Manifest Checkout Engine ---
// --- 8. Dynamic Manifest Checkout Engine (Isolated DB Canvas) ---
document.addEventListener('DOMContentLoaded', () => {
    const cartWrapper = document.getElementById('cart-items-wrapper');
    const emptyStateView = document.getElementById('empty-state-view');
    const manifestCountLabel = document.getElementById('manifest-count-label');

    const subtotalDisplay = document.getElementById('summary-subtotal');
    const shippingDisplay = document.getElementById('summary-shipping');
    const taxDisplay = document.getElementById('summary-tax');
    const grandTotalDisplay = document.getElementById('summary-grandtotal');

    const promoApplyBtn = document.getElementById('promo-apply-btn');
    const promoField = document.getElementById('promo-field');
    const promoFeedbackLog = document.getElementById('promo-feedback-log');

    let currentDiscountMultiplier = 0.0;

    // Execution guard: Only process if standing directly on the cart structural view
    if (cartWrapper) {

        // Core Retreival Engine: Queries the DB for the user's isolated document items array
        async function fetchAndRenderCloudCart() {
            const token = localStorage.getItem('userAuthToken');
            if (!token) return;

            try {
                const response = await fetch('http://localhost:5000/api/cart', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();

                if (response.ok && data.items) {
                    renderDynamicCartManifest(data.items);
                } else {
                    console.error("MANIFEST READ FAULT:", data.error);
                }
            } catch (err) {
                console.error("INFRASTRUCTURE SYNC FAULT:", err);
            }
        }

        function renderDynamicCartManifest(itemsArray) {
            cartWrapper.innerHTML = '';

            if (!itemsArray || itemsArray.length === 0) {
                cartWrapper.classList.add('display-hidden');
                if (emptyStateView) emptyStateView.classList.remove('display-hidden');
                updateSystemTotals([]);
                return;
            }

            cartWrapper.classList.remove('display-hidden');
            if (emptyStateView) emptyStateView.classList.add('display-hidden');

            itemsArray.forEach(item => {
                const calculatedRowTotal = (item.price * item.quantity).toFixed(2);
                const cardMarkup = `
                    <div class="cart-item-card" data-item-id="${item.productId}">
                        <div class="cart-item-img-frame">
                            <img src="${item.imageUrl}" alt="${item.title}">
                        </div>
                        <div class="cart-item-details">
                            <span class="item-series-tag">SECURE IDENTITY MANIFEST // STORAGE MATRIX</span>
                            <h3 class="item-name">${item.title}</h3>
                        </div>
                        <div class="cart-item-controls">
                            <div class="quantity-control-engine">
                                <button class="qty-btn qty-minus"><i class="fa-solid fa-minus"></i></button>
                                <span class="qty-display-value">${item.quantity}</span>
                                <button class="qty-btn qty-plus"><i class="fa-solid fa-plus"></i></button>
                            </div>
                            <span class="item-computed-price" data-base-price="${item.price}">$${calculatedRowTotal}</span>
                        </div>
                        <button class="cart-item-remove-trigger"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                `;
                cartWrapper.insertAdjacentHTML('beforeend', cardMarkup);
            });

            updateSystemTotals(itemsArray);
        }

        function updateSystemTotals(itemsArray) {
            let computedSubtotal = 0;
            let runningItemCount = 0;

            itemsArray.forEach(item => {
                computedSubtotal += (item.price * item.quantity);
                runningItemCount += item.quantity;
            });

            if (itemsArray.length === 0) {
                if (manifestCountLabel) manifestCountLabel.textContent = '0 UNITS ALLOCATED';
                if (subtotalDisplay) subtotalDisplay.textContent = '$0.00';
                if (shippingDisplay) shippingDisplay.textContent = '$0.00';
                if (taxDisplay) taxDisplay.textContent = '$0.00';
                if (grandTotalDisplay) grandTotalDisplay.textContent = '$0.00';
                return;
            }

            const finalShippingCost = computedSubtotal > 150 ? 0 : 15;
            const calculatedTaxVal = computedSubtotal * 0.10;
            const baseDiscountAmount = computedSubtotal * currentDiscountMultiplier;
            const structuralGrandTotal = (computedSubtotal + finalShippingCost + calculatedTaxVal) - baseDiscountAmount;

            if (manifestCountLabel) manifestCountLabel.textContent = `${runningItemCount} ${runningItemCount === 1 ? 'UNIT' : 'UNITS'} STAGED`;
            if (subtotalDisplay) subtotalDisplay.textContent = `$${computedSubtotal.toFixed(2)}`;
            if (shippingDisplay) shippingDisplay.textContent = finalShippingCost === 0 ? 'FREE DELIVERY' : `$${finalShippingCost.toFixed(2)}`;
            if (taxDisplay) taxDisplay.textContent = `$${calculatedTaxVal.toFixed(2)}`;
            if (grandTotalDisplay) grandTotalDisplay.textContent = `$${Math.max(0, structuralGrandTotal).toFixed(2)}`;
        }

        // Event Delegator: Intercepts user operations directly inside the cart rows
        cartWrapper.addEventListener('click', async (event) => {
            const clickTarget = event.target;
            const contextCard = clickTarget.closest('.cart-item-card');
            if (!contextCard) return;

            const productId = contextCard.getAttribute('data-item-id');
            const token = localStorage.getItem('userAuthToken');
            if (!token) return;

            // Operation Branch: Increment Quantity
            if (clickTarget.closest('.qty-plus')) {
                try {
                    const response = await fetch('http://localhost:5000/api/cart/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ productId, quantity: 1 })
                    });
                    const data = await response.json();
                    if (response.ok) fetchAndRenderCloudCart();
                } catch (err) { console.error("INCREMENT METRICS ERROR:", err); }
            }

            // Operation Branch: Decrement Quantity
            else if (clickTarget.closest('.qty-minus')) {
                try {
                    const currentQty = parseInt(contextCard.querySelector('.qty-display-value').textContent);
                    if (currentQty <= 1) return; // Prevent lowering below 1 unit boundary

                    const response = await fetch('http://localhost:5000/api/cart/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ productId, quantity: -1 }) // Send negative balance to decrease parameter count
                    });
                    if (response.ok) fetchAndRenderCloudCart();
                } catch (err) { console.error("DECREMENT METRICS ERROR:", err); }
            }

            // Operation Branch: Evict/Purge Item Entry Node Entirely
            else if (clickTarget.closest('.cart-item-remove-trigger')) {
                contextCard.style.opacity = '0';
                contextCard.style.transform = 'scale(0.9) translateY(-10px)';
                contextCard.style.transition = 'all 0.3s ease';

                try {
                    const response = await fetch(`http://localhost:5000/api/cart/remove/${productId}`, {
                        method: 'DELETE',
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (response.ok) {
                        setTimeout(() => { fetchAndRenderCloudCart(); }, 300);
                    }
                } catch (err) { console.error("DELETION CORRIDOR ABORTED:", err); }
            }
        });

        if (promoApplyBtn) {
            promoApplyBtn.addEventListener('click', () => {
                const rawInputString = promoField.value.trim().toUpperCase();
                if (promoFeedbackLog) promoFeedbackLog.className = 'promo-feedback-active';

                if (rawInputString === 'VAULT20') {
                    currentDiscountMultiplier = 0.20;
                    if (promoFeedbackLog) {
                        promoFeedbackLog.style.color = '#b6ff00';
                        promoFeedbackLog.textContent = 'ACCESS AUTHORIZED // 20% VAULT SAVINGS ENABLED.';
                    }
                    fetchAndRenderCloudCart();
                } else {
                    if (promoFeedbackLog) {
                        promoFeedbackLog.style.color = '#ef4444';
                        promoFeedbackLog.textContent = 'SECURITY REJECTION: INVALID PERMIT AUTH KEY.';
                    }
                }
            });
        }

        // Initialize user data collection when dashboard frames render
        fetchAndRenderCloudCart();
    }

    const checkoutOverlay = document.getElementById('checkout-flow-overlay');
    const triggerCheckoutBtn = document.getElementById('checkout-trigger-btn');
    const abortCheckoutBtn = document.getElementById('abort-checkout-btn');
    const placeOrderFinalBtn = document.getElementById('place-order-final-btn');

    // Form Inputs
    const checkoutForm = document.getElementById('secure-checkout-intake-form');
    const emailField = document.getElementById('checkout-email');
    const txIdField = document.getElementById('checkout-txId');

    // Radio Triggers
    const paymentRadios = document.querySelectorAll('input[name="paymentOption"]');
    const codInstructions = document.getElementById('cod-instructions-panel');
    const easypaisaInstructions = document.getElementById('easypaisa-instructions-panel');
    const previewItemsBin = document.getElementById('checkout-items-preview-bin');

    let processingCurrentItemsStack = [];
    let calculatedTotalsCache = 0;

    // 1. Intercept Core Checkout Initialization Click Loop
    if (triggerCheckoutBtn) {
        triggerCheckoutBtn.addEventListener('click', async () => {
            const token = localStorage.getItem('userAuthToken');
            const profileData = localStorage.getItem('userDataProfile');

            if (!token || !profileData) {
                window.displaySystemModal(
                    "✕ Security Access Denied",
                    "Please execute a user credentials authorization login step to unlock secure transaction checkouts.",
                    "error"
                );
                return;
            }

            try {
                const profile = JSON.parse(profileData);
                if (emailField) emailField.value = profile.email || "";

                // Query server for verified, latest database state items
                const response = await fetch('http://localhost:5000/api/cart', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();

                if (!response.ok || !data.items || data.items.length === 0) {
                    window.displaySystemModal("✕ Empty Manifest Exception", "Cannot initialize transaction arrays. Your shopping cart container holds no items.", "error");
                    return;
                }

                processingCurrentItemsStack = data.items;
                populateCheckoutSummaryPanel(data.items);

                if (checkoutOverlay) checkoutOverlay.style.display = 'flex';

            } catch (err) {
                console.error("GATEWAY LINK INTAKE FAULT:", err);
            }
        });
    }

    // 2. Form Summary View Builder Line Handler
    function populateCheckoutSummaryPanel(items) {
        if (!previewItemsBin) return;
        previewItemsBin.innerHTML = '';

        let subtotalAccumulator = 0;
        items.forEach(item => {
            subtotalAccumulator += (item.price * item.quantity);
            const lineHtml = `
                <div class="checkout-line-item-row">
                    <div class="line-item-left">
                        <h4>${item.title.toUpperCase()}</h4>
                        <span>UNITS: ${item.quantity} × $${item.price.toFixed(2)}</span>
                    </div>
                    <span class="line-item-price-total">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `;
            previewItemsBin.insertAdjacentHTML('beforeend', lineHtml);
        });

        const transitFreight = subtotalAccumulator > 150 ? 0 : 15;
        const computedTaxVal = subtotalAccumulator * 0.10;
        calculatedTotalsCache = subtotalAccumulator + transitFreight + computedTaxVal;

        document.getElementById('chk-subtotal').textContent = `$${subtotalAccumulator.toFixed(2)}`;
        document.getElementById('chk-shipping').textContent = transitFreight === 0 ? "FREE" : `$${transitFreight.toFixed(2)}`;
        document.getElementById('chk-tax').textContent = `$${computedTaxVal.toFixed(2)}`;
        document.getElementById('chk-grandtotal').textContent = `$${calculatedTotalsCache.toFixed(2)}`;
    }

    // 3. Payment Modality Panel Layout Toggler Option Layer
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'EasyPaisa') {
                if (codInstructions) codInstructions.style.display = 'none';
                if (easypaisaInstructions) easypaisaInstructions.style.display = 'block';
                if (txIdField) txIdField.setAttribute('required', 'required');
            } else {
                if (easypaisaInstructions) easypaisaInstructions.style.display = 'none';
                if (codInstructions) codInstructions.style.display = 'block';
                if (txIdField) txIdField.removeAttribute('required');
            }
        });
    });

    // 4. Secure Validation Form Dispatch Submission Stream
    if (placeOrderFinalBtn) {
        placeOrderFinalBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            const token = localStorage.getItem('userAuthToken');

            // Collect Field Identity Matrix Elements
            const fullName = document.getElementById('checkout-fullName').value.trim();
            const phoneNumber = document.getElementById('checkout-phone').value.trim();
            const city = document.getElementById('checkout-city').value.trim();
            const deliveryAddress = document.getElementById('checkout-address').value.trim();
            const activePaymentOption = document.querySelector('input[name="paymentOption"]:checked').value;
            const transactionId = txIdField ? txIdField.value.trim() : "";

            // Absolute Form Parameter Validation Guard Rails
            if (!fullName || !phoneNumber || !city || !deliveryAddress) {
                window.displaySystemModal("✕ Incomplete Parameters", "Please populate all logistical text entry boxes correctly before commitment.", "error");
                return;
            }

            if (activePaymentOption === 'EasyPaisa' && !transactionId) {
                window.displaySystemModal("✕ Missing Transaction Token", "A verified Transaction reference ID field is mandatory for EasyPaisa verification checks.", "error");
                return;
            }

            // Set loading interaction presentation status flags
            const originalButtonLabel = placeOrderFinalBtn.innerHTML;
            placeOrderFinalBtn.innerHTML = 'PROCESSING ORDER MATRIX <i class="fa-solid fa-spinner fa-spin-pulse"></i>';
            placeOrderFinalBtn.style.pointerEvents = 'none';

            const operationalPayload = {
                customerInfo: { fullName, phoneNumber, email: emailField.value, city, deliveryAddress },
                items: processingCurrentItemsStack.map(i => ({ productId: i.productId, title: i.title, price: i.price, quantity: i.quantity })),
                totalPrice: calculatedTotalsCache,
                paymentMethod: activePaymentOption,
                transactionId: activePaymentOption === 'EasyPaisa' ? transactionId : ""
            };

            try {
                const response = await fetch('http://localhost:5000/api/orders/place', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(operationalPayload)
                });

                const serverResult = await response.json();

                if (response.ok) {
                    if (checkoutOverlay) checkoutOverlay.style.display = 'none';
                    checkoutForm.reset();

                    window.displaySystemModal(
                        "✓ Order Placed Successfully",
                        `Thank you for your order. Your execution payload is secure. We will contact you soon regarding delivery. Tracking Code ID: ${serverResult.orderId}`,
                        "success",
                        () => {
                            // Direct redirect back to clean slate browse portfolio
                            window.location.href = '../index.html';
                        }
                    );
                } else {
                    window.displaySystemModal("✕ Transaction Declined", serverResult.error || "The routing engine refused to compile this transaction map.", "error");
                }

            } catch (err) {
                console.error("INFRASTRUCTURE WRITING NETWORK FAILURE:", err);
                window.displaySystemModal("✕ Connection Discharged", "Lost network data pipes to server mid-handshake allocation.", "error");
            } finally {
                placeOrderFinalBtn.innerHTML = originalButtonLabel;
                placeOrderFinalBtn.style.pointerEvents = 'auto';
            }
        });
    }

    // Modal Close Triggers
    if (abortCheckoutBtn) {
        abortCheckoutBtn.addEventListener('click', () => {
            if (checkoutOverlay) checkoutOverlay.style.display = 'none';
        });
    }
});

// --- 9. Cinematic Vault Route Director ---
function navigateToCart(event) {
    event.preventDefault();
    const curtain = document.getElementById('transit-curtain');
    const insidePagesDirectory = window.location.pathname.includes('/pages/');
    const destinationPath = insidePagesDirectory ? './cart.html' : './pages/cart.html';

    if (curtain) {
        curtain.classList.add('curtain-active');
        setTimeout(() => {
            window.location.href = destinationPath;
        }, 550);
    } else {
        window.location.href = destinationPath;
    }
}



// --- 10. High-End Translucent Auth Window Trigger Controller Matrix ---
document.addEventListener('DOMContentLoaded', () => {
    const authOverlay = document.getElementById('auth-overlay');
    const structuralBox = document.getElementById('auth-structural-box');
    const authCloseBtn = document.getElementById('auth-close-btn');

    // Switch triggers
    const switchToSignupBtn = document.getElementById('switch-to-signup');
    const switchToLoginBtn = document.getElementById('switch-to-login');

    // Global navigation targets selectors
    const loginTriggers = document.querySelectorAll('.link-login, [onclick*="OpenLoginPortal"]');
    const signupTriggers = document.querySelectorAll('.btn-signup, [onclick*="OpenSignupPortal"]');

    if (authOverlay && structuralBox) {

        // Open the workspace panel and pick core target alignment
        function activateAuthPortal(targetMode) {
            // Remove previous inline setup properties safely
            if (targetMode === 'signup') {
                structuralBox.classList.add('state-signup-active');
            } else {
                structuralBox.classList.remove('state-signup-active');
            }
            authOverlay.classList.add('overlay-open');
            document.body.style.overflow = 'hidden'; // Locks baseline background scrolling
        }

        function closeAuthPortal() {
            authOverlay.classList.remove('overlay-open');
            document.body.style.overflow = ''; // Unlocks browser view canvas structure
        }

        // Intercept standard header buttons actions
        loginTriggers.forEach(trigger => {
            // Clean up old string placeholder actions if present
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

        // Toggle triggers switching tracks
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

        // Close Action click binds
        if (authCloseBtn) {
            authCloseBtn.addEventListener('click', closeAuthPortal);
        }

        // Closes the window gracefully if user clicks anywhere outside the form grid box canvas
        authOverlay.addEventListener('click', (e) => {
            if (e.target === authOverlay) {
                closeAuthPortal();
            }
        });

        // ESC Key safety release loop
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && authOverlay.classList.contains('overlay-open')) {
                closeAuthPortal();
            }
        });
    }
});

// --- 11. Tactical Cyber Footer Intelligent Link Routing Matrix ---
document.addEventListener('DOMContentLoaded', () => {

    // 1. Data Store Injection Database Map For Resources & Governance
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

    // 2. Query UI Element Handles
    const infoModal = document.getElementById('footer-node-modal');
    const infoTitle = document.getElementById('footer-modal-title');
    const infoContent = document.getElementById('footer-modal-content');
    const infoCloseBtn = document.getElementById('footer-modal-close-btn');

    // Handle Resources & Governance Click Triggers
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

    // Close Modal Events
    if (infoCloseBtn && infoModal) {
        infoCloseBtn.addEventListener('click', () => infoModal.classList.remove('node-active'));
        infoModal.addEventListener('click', (e) => { e.target === infoModal && infoModal.classList.remove('node-active'); });
    }

    // 3. Handle Divisions Links Integration (Autoscrolls & Sets Up Filters)
    document.querySelectorAll('.footer-shop-filter').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetedFilterValue = link.getAttribute('data-filter');

            // Find your shop products area/filters (assuming brand, type checkboxes, or size grids match)
            const targetShowcaseArea = document.getElementById('products') || document.querySelector('.products-section') || document.querySelector('main');

            if (targetShowcaseArea) {
                targetShowcaseArea.scrollIntoView({ behavior: 'smooth' });
            }

            // Simulates clicking a specific checkbox or running an existing filter on your active shop script page
            const filterCheckbox = document.querySelector(`input[value="${targetedFilterValue}"]`);
            if (filterCheckbox) {
                filterCheckbox.checked = true;
                // Dispatch event to fire your filter functionality automatically
                filterCheckbox.dispatchEvent(new Event('change'));
            } else if (typeof runSneakerFilter === 'function') {
                // If you have a custom global filter tracking variable set up in your main script file
                window.selectedCategory = targetedFilterValue;
                runSneakerFilter();
            }
        });


    });


});


document.addEventListener('DOMContentLoaded', () => {

    // --- Core Modal Layout Component References ---
    const globalModal = document.getElementById('global-system-modal');
    const modalIconZone = document.getElementById('modal-icon-wrapper');
    const modalTitleText = document.getElementById('modal-title-text');
    const modalBodyText = document.getElementById('modal-body-text');
    const modalContinueBtn = document.getElementById('modal-continue-btn');

    let currentModalCallback = null;
    let temporaryStorageEmail = "";

    // ===================================================
    // UI CORE CONTROLLERS: LOADING & MODAL MANAGERS
    // ===================================================

    // 1. Manage Button Submission States Dynamically
    function setButtonLoadingState(buttonElement, isLoading, structuralText = "") {
        if (!buttonElement) return;

        if (isLoading) {
            buttonElement.disabled = true;
            buttonElement.setAttribute('data-original-html', buttonElement.innerHTML);
            buttonElement.innerHTML = `<div class="button-btn-loader"></div> <span>${structuralText}</span>`;
        } else {
            buttonElement.disabled = false;
            if (buttonElement.hasAttribute('data-original-html')) {
                buttonElement.innerHTML = buttonElement.getAttribute('data-original-html');
            }
        }
    }

    // 2. Global Custom Animated Modal Trigger (Exposed Globally)
    window.displaySystemModal = function (titleText, bodyText, statusType = 'success', resolutionCallback = null) {
        modalTitleText.textContent = titleText;
        modalBodyText.textContent = bodyText;
        currentModalCallback = resolutionCallback;

        // Reset icon status classes
        modalIconZone.className = "modal-status-icon-zone";

        if (statusType === 'success') {
            modalIconZone.classList.add('status-success');
            modalIconZone.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
        } else {
            modalIconZone.classList.add('status-error');
            modalIconZone.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
        }

        // Trigger scale up transition
        globalModal.classList.add('modal-visible');
    };
    // Modal Continue Action Event Listener
    if (modalContinueBtn) {
        modalContinueBtn.addEventListener('click', () => {
            globalModal.classList.remove('modal-visible');
            if (currentModalCallback) {
                currentModalCallback();
                currentModalCallback = null; // Flush handler reference memory
            }
        });
    }


    // ===================================================
    // AUTHENTICATION PIPELINE ENGINE WITH RUNTIME TIMER LOOP
    // ===================================================

    const signupForm = document.getElementById('network-signup-form');
    const otpPanel = document.getElementById('signup-otp-panel');
    const otpForm = document.getElementById('network-otp-form');
    const loginForm = document.getElementById('network-login-form');

    const timerClockSpan = document.getElementById('otp-timer-clock');
    const resendBtnTrigger = document.getElementById('otp-resend-action-trigger');

    let countdownLifecycleInterval = null;
    let cachedSignupStateData = null; // Caches payload state parameters locally for seamless token regeneration loops

    // RUNTIME ENGINE COMPONENT: Automated 5-Minute Telemetry Countdown Vector
    function triggerOtpWindowCountdownTimer() {
        if (countdownLifecycleInterval) clearInterval(countdownLifecycleInterval);

        let remainingDurationSeconds = 300; // 5 Minutes

        if (resendBtnTrigger) {
            resendBtnTrigger.disabled = true;
            resendBtnTrigger.style.color = "#5b6b94";
            resendBtnTrigger.style.cursor = "not-allowed";
        }

        countdownLifecycleInterval = setInterval(() => {
            remainingDurationSeconds--;

            const layoutMinutes = Math.floor(remainingDurationSeconds / 60);
            const layoutSeconds = remainingDurationSeconds % 60;

            // Format to standard tracking stopwatch text pattern
            if (timerClockSpan) {
                timerClockSpan.textContent = `${String(layoutMinutes).padStart(2, '0')}:${String(layoutSeconds).padStart(2, '0')}`;
            }

            if (remainingDurationSeconds <= 0) {
                clearInterval(countdownLifecycleInterval);
                if (timerClockSpan) timerClockSpan.textContent = "00:00";

                // Toggle action links to allow fresh network generation dispatch loops
                if (resendBtnTrigger) {
                    resendBtnTrigger.disabled = false;
                    resendBtnTrigger.style.color = "#B6FF00"; // Neon Green theme highlight
                    resendBtnTrigger.style.cursor = "pointer";
                }

                displaySystemModal(
                    "✕ Security Token Expired",
                    "The temporary storage validation lease has expired. Please execute a token request loop to reactivate the interface.",
                    "error"
                );
            }
        }, 1000);
    }

    // 1. PIPELINE ACTION: ACCOUNT SIGNUP (STAGE DATA ONLY)
    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const submitBtn = signupForm.querySelector('.btn-auth-execute');

            const fullName = document.getElementById('signup-name').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-pass').value;

            // Cache validation metrics local-side to safely reuse on token re-requests
            cachedSignupStateData = { fullName, email, password };

            setButtonLoadingState(submitBtn, true, "Initializing Handshake...");

            try {
                const response = await fetch('http://localhost:5000/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fullName, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    temporaryStorageEmail = email;
                    setButtonLoadingState(submitBtn, false);

                    displaySystemModal(
                        "✓ Verification Token Issued",
                        "A high-clearance 6-digit access code was dropped in your inbox. Validate within 5 minutes to create your profile.",
                        "success",
                        () => {
                            const signupSubtitle = document.getElementById('signup-subtitle-text');
                            const signupFooter = document.getElementById('signup-routing-footer');

                            if (signupSubtitle) {
                                signupSubtitle.innerHTML = `<span style="color: #ff3b30;">> SECURE ZONE // CHALLENGE PASS REQUIRED:</span> Provide tracking credentials.`;
                            }

                            if (signupForm) signupForm.style.display = "none";
                            if (signupFooter) signupFooter.style.display = "none";
                            if (otpPanel) otpPanel.style.display = "block";

                            // Initialize runtime stopwatch loop execution
                            triggerOtpWindowCountdownTimer();
                        }
                    );
                } else {
                    setButtonLoadingState(submitBtn, false);
                    displaySystemModal("✕ Pipeline Mismatch", data.error || "Execution terminated.", "error");
                }
            } catch (err) {
                setButtonLoadingState(submitBtn, false);
                displaySystemModal("✕ Telemetry Link Loss", "Verify server instance configurations are operational.", "error");
            }
        });
    }

    // INTERACTIVE SUB-LOOP: TRIGGER TOKEN RE-DISPATCH REQUESTS
    if (resendBtnTrigger) {
        resendBtnTrigger.addEventListener('click', async () => {
            if (!cachedSignupStateData) return;

            resendBtnTrigger.disabled = true;
            resendBtnTrigger.style.textContent = "DISPATCHING...";

            try {
                const response = await fetch('http://localhost:5000/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cachedSignupStateData)
                });

                if (response.ok) {
                    displaySystemModal("✓ Token Reset Successful", "A fresh cryptographic token was routed successfully. Interface reset.", "success");
                    triggerOtpWindowCountdownTimer();
                } else {
                    resendBtnTrigger.disabled = false;
                    resendBtnTrigger.style.color = "#B6FF00";
                    displaySystemModal("✕ Token Refresh Aborted", "A network fault blocked fresh session mapping allocation.", "error");
                }
            } catch (err) {
                resendBtnTrigger.disabled = false;
                resendBtnTrigger.style.color = "#B6FF00";
                displaySystemModal("✕ Pipeline Decoupled", "Token validation loop failed to connect.", "error");
            }
        });

        // Add visual style modifications on hovering the resend action trigger
        resendBtnTrigger.addEventListener('mouseenter', () => {
            if (!resendBtnTrigger.disabled) resendBtnTrigger.style.color = "#ffffff";
        });
        resendBtnTrigger.addEventListener('mouseleave', () => {
            if (!resendBtnTrigger.disabled) resendBtnTrigger.style.color = "#B6FF00";
        });
    }

    // 2. PIPELINE ACTION: SIGNUP OTP VERIFICATION (COMMIT WRITE & LOGIN)
    // ===================================================
    // PIPELINE ACTION: SIGNUP OTP VERIFICATION (COMMIT WRITE & LOGIN)
    // ===================================================
    // ===================================================
    // PIPELINE ACTION: SIGNUP OTP VERIFICATION (COMMIT WRITE & LOGIN)
    // ===================================================
    if (otpForm) {
        otpForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Halt default browser document execution loops

            // Explicitly grab the button element right inside the form to toggle loading indicators
            const submitBtn = document.getElementById('otp-submit-btn-trigger');
            const otpCode = document.getElementById('verification-code').value.trim();

            if (!temporaryStorageEmail) {
                displaySystemModal("✕ Verification State Lost", "We lost your active registration mapping reference pointer. Please refresh your browser and try again.", "error");
                return;
            }

            // Lock interactions and fire saas button spinner
            setButtonLoadingState(submitBtn, true, "Authorizing Entry...");

            try {
                const response = await fetch('http://localhost:5000/api/auth/verify-signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: temporaryStorageEmail, otpCode })
                });

                const data = await response.json();

                if (response.ok) {
                    // Turn off active window tracking clock
                    if (countdownLifecycleInterval) clearInterval(countdownLifecycleInterval);

                    localStorage.setItem('userAuthToken', data.token);
                    localStorage.setItem('userDataProfile', JSON.stringify(data.user));

                    setButtonLoadingState(submitBtn, false);
                    otpForm.reset();

                    displaySystemModal(
                        "✓ Verification Complete",
                        `Identity handshake verified successfully. Initializing live workspace arrays for ${data.user.fullName}.`,
                        "success",
                        () => {
                            window.location.reload(); // Synchronize layout views & update navbar avatar profile
                        }
                    );
                } else {
                    setButtonLoadingState(submitBtn, false);
                    displaySystemModal("✕ Verification Matrix Failure", data.error || "Provided token sequence is unaligned.", "error");
                }
            } catch (err) {
                setButtonLoadingState(submitBtn, false);
                displaySystemModal("✕ Verification Matrix Timeout", "Critical data verification thread dropped mid-handshake. Check terminal network grids.", "error");
            }
        });
    }

    // 3. PIPELINE ACTION: USER ACCOUNT ACCESS PORTAL (LOGGING IN)
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const submitBtn = loginForm.querySelector('.btn-auth-execute');

            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-pass').value;

            setButtonLoadingState(submitBtn, true, "Logging In...");

            try {
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('userAuthToken', data.token);
                    localStorage.setItem('userDataProfile', JSON.stringify(data.user));

                    setButtonLoadingState(submitBtn, false);
                    loginForm.reset();

                    displaySystemModal(
                        "✓ Authentication Verified",
                        `Handshake success. Welcome back operator. Switching workspace view profile arrays...`,
                        "success",
                        () => {
                            window.location.reload(); // Instantly update navbar with profile avatar & workspace data
                        }
                    );
                } else {
                    setButtonLoadingState(submitBtn, false);
                    displaySystemModal("✕ Access Denied", data.error || "Invalid authentication baseline footprint credentials.", "error");
                }
            } catch (err) {
                setButtonLoadingState(submitBtn, false);
                displaySystemModal("✕ Handshake Terminated", "Link dropped unexpectedly. Verify system infrastructure layers.", "error");
            }
        });
    }


    // ===================================================
    // CLIENT SESSION TRACKING & PERSISTENT STATE SYNC
    // ===================================================
    const guestLinks = document.getElementById('nav-guest-links');
    const userProfileZone = document.getElementById('nav-user-profile');
    const avatarBadge = document.getElementById('user-avatar-badge');
    const displayNameSpan = document.getElementById('user-display-name');

    const dropdownTrigger = document.getElementById('profile-menu-trigger');
    const floatingDropdown = document.getElementById('profile-floating-dropdown');
    const logoutBtn = document.getElementById('session-logout-btn');

    function synchronizeUserSessionState() {
        const token = localStorage.getItem('userAuthToken');
        const profileDataRaw = localStorage.getItem('userDataProfile');

        if (token && profileDataRaw) {
            try {
                const profile = JSON.parse(profileDataRaw);
                const operatorName = profile.fullName || "Operator";

                if (displayNameSpan) displayNameSpan.textContent = operatorName;
                if (avatarBadge) avatarBadge.textContent = operatorName.trim().charAt(0).toUpperCase();

                if (guestLinks) guestLinks.style.display = 'none';
                if (userProfileZone) userProfileZone.style.display = 'block';
            } catch (err) {
                purgeSessionAuthorizationCredentials();
            }
        } else {
            if (userProfileZone) userProfileZone.style.display = 'none';
            if (guestLinks) guestLinks.style.display = 'flex';
        }
    }

    if (dropdownTrigger && floatingDropdown) {
        dropdownTrigger.addEventListener('click', (event) => {
            event.stopPropagation();
            floatingDropdown.classList.toggle('active-panel');
            const arrow = dropdownTrigger.querySelector('.dropdown-arrow-icon');
            if (arrow) {
                arrow.style.transform = floatingDropdown.classList.contains('active-panel') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });

        document.addEventListener('click', () => {
            if (floatingDropdown.classList.contains('active-panel')) {
                floatingDropdown.classList.remove('active-panel');
                const arrow = dropdownTrigger.querySelector('.dropdown-arrow-icon');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            }
        });
    }

    function purgeSessionAuthorizationCredentials() {
        localStorage.removeItem('userAuthToken');
        localStorage.removeItem('userDataProfile');

        // Purging volatile session cache forces the DOM state to reload clean without memory leaks
        window.location.reload();
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            purgeSessionAuthorizationCredentials();
        });
    }

    synchronizeUserSessionState();

    // =========================================================================
    // E-COMMERCE CORE SECURITY ARCHITECTURE: AUTHENTICATION BARRIER SHIELD
    // =========================================================================

    const cartLockoutHud = document.getElementById('cart-lockout-hud-screen');
    const secureCartActivePayload = document.getElementById('secure-cart-active-payload');
    const checkoutBtn = document.getElementById('checkout-action-trigger-btn');

    const authOverlayModal = document.getElementById('auth-overlay');
    const triggerLoginBtn = document.getElementById('lockout-trigger-login');
    const triggerSignupBtn = document.getElementById('lockout-trigger-signup');

    // Utility Component: Instantly assess if the local runtime context possesses an active session pass token
    function checkUserAuthenticationState() {
        const activeToken = localStorage.getItem('userAuthToken');
        const activeProfile = localStorage.getItem('userDataProfile');
        return (activeToken && activeProfile) ? JSON.parse(activeProfile) : null;
    }

    // 1. RUNTIME GRAPHICAL MONITOR: AUTOMATED NAVBAR COMPILATION ENGINE
    function enforceNavbarSessionStateCompilation() {
        const authenticatedUser = checkUserAuthenticationState();

        // Target structural entry points from your navbar
        const guestLinks = document.getElementById('guest-links-container'); // Wrap login/signup buttons with this id in html
        const userProfileZone = document.getElementById('user-profile-hud-zone'); // Wrap avatar profile item with this id
        const accountBadgeName = document.getElementById('nav-user-account-name');

        if (authenticatedUser) {
            if (guestLinks) guestLinks.style.display = 'none';
            if (userProfileZone) {
                userProfileZone.style.display = 'flex';
                userProfileZone.style.alignItems = 'center';
                userProfileZone.style.gap = '0.75rem';
            }
            if (accountBadgeName) accountBadgeName.textContent = authenticatedUser.fullName.toUpperCase();
        } else {
            if (userProfileZone) userProfileZone.style.display = 'none';
            if (guestLinks) guestLinks.style.display = 'flex';
        }
    }

    // 2. RUNTIME GRAPHICAL MONITOR: SECURE CART VIEW SECURITY ENFORCEMENT
    function enforceCartViewProtectionLayer() {
        const isUserCleared = checkUserAuthenticationState();

        if (isUserCleared) {
            if (cartLockoutHud) cartLockoutHud.style.display = 'none';
            if (secureCartActivePayload) secureCartActivePayload.style.display = 'block';

            // OPTIONAL SYNCHRONIZATION POINT: Dispatch network call to update or restore cloud cart storage models
            console.log(">> SESSION OK: Recovering cloud payload metrics from data warehouse endpoints...");
        } else {
            if (secureCartActivePayload) secureCartActivePayload.style.display = 'none';
            if (cartLockoutHud) {
                cartLockoutHud.style.display = 'flex';
            }
        }
    }

    // 3. ACTION DISPATCH INTERCEPTOR: PROTECTED "ADD TO CART" FUNNEL
    window.interceptAddToCartActionPipeline = function (productMetadataPayload) {
        const activeUserSession = checkUserAuthenticationState();

        if (!activeUserSession) {
            // Unauthenticated intercept: Block operations and reveal interactive modal challenge
            displaySystemModal(
                "✕ Login Required",
                "Please establish a verified profile authorization connection to lock in and save custom items inside your permanent shopping basket cargo arrays.",
                "error",
                () => {
                    // Action callback parameter: Trigger auth modal opening transition smoothly
                    if (authOverlayModal) authOverlayModal.style.display = 'flex';
                }
            );
            return false;
        }

        // Authenticated flow: Add product payload parameters to your state management array logic below
        console.log(">> COMMITTING TO BASKET STACK:", productMetadataPayload);

        displaySystemModal(
            "✓ Product Synced Successfully",
            "Item configuration array registered and saved securely inside your active session network basket ledger.",
            "success"
        );
        return true;
    };

    // 4. CHECKOUT PROTECTION LAYER INTERCEPTOR
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', async () => {
            const token = localStorage.getItem('userAuthToken');

            if (!token) {
                displaySystemModal(
                    "✕ Transaction Aborted",
                    "A valid secure credential identity token handshake could not be found. Please pass authentication challenges to access checkouts.",
                    "error",
                    () => { if (authOverlayModal) authOverlayModal.style.display = 'flex'; }
                );
                return;
            }

            try {
                // Verify server-side authorization token integrity match clearance
                const response = await fetch('http://localhost:5000/api/cart/checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    displaySystemModal("✓ Route Cleared", "Backend checkout sequence authorization verified. Forwarding request payload safely...", "success");
                } else {
                    displaySystemModal("✕ Pipeline Discharged", "Your backend routing layer discarded this request token. Access denied.", "error");
                }
            } catch (err) {
                displaySystemModal("✕ Infrastructure Fault", "Server connectivity lost mid-handshake validation processing thread.", "error");
            }
        });
    }

    // Bind event hooks to the lockout layout action trigger buttons
    if (triggerLoginBtn) {
        triggerLoginBtn.addEventListener('click', () => {
            if (authOverlayModal) authOverlayModal.style.display = 'flex';
            // Switch layout views to login portal block inside modal
            const switchToLoginBtn = document.getElementById('switch-to-login');
            if (switchToLoginBtn) switchToLoginBtn.click();
        });
    }

    if (triggerSignupBtn) {
        triggerSignupBtn.addEventListener('click', () => {
            if (authOverlayModal) authOverlayModal.style.display = 'flex';
            // Switch layout views to signup profile form inside modal
            const switchToSignupBtn = document.getElementById('switch-to-signup');
            if (switchToSignupBtn) switchToSignupBtn.click();
        });
    }

    enforceCartViewProtectionLayer();

    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');

    if (menuToggleBtn && mobileMenuDrawer) {
        menuToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggleBtn.classList.toggle('toggle-active');
            mobileMenuDrawer.classList.toggle('menu-is-open');
        });

        // Close mobile drawer seamlessly if user clicks out of the navigation lane
        document.addEventListener('click', (e) => {
            if (!mobileMenuDrawer.contains(e.target) && !menuToggleBtn.contains(e.target)) {
                menuToggleBtn.classList.remove('toggle-active');
                mobileMenuDrawer.classList.remove('menu-is-open');
            }
        });
    }
});

// Add this safety wrap around your event listener
const placeOrderBtn = document.getElementById('place-order-whatsapp-btn');

if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', function () {
        // 1. Get the form element to check for validity
        const form = document.getElementById('secure-checkout-intake-form');

        if (form && !form.checkValidity()) {
            // If the form is missing required fields, trigger native browser validation alerts
            form.reportValidity();
            return;
        }

        // 2. Extract values from the inputs
        const fullName = document.getElementById('checkout-fullName')?.value.trim() || 'N/A';
        const phone = document.getElementById('checkout-phone')?.value.trim() || 'N/A';
        const size = document.getElementById('checkout-size')?.value.trim() || 'N/A';
        const color = document.getElementById('checkout-color')?.value.trim() || 'N/A';
        const email = document.getElementById('checkout-email')?.value.trim() || 'N/A';
        const city = document.getElementById('checkout-city')?.value.trim() || 'N/A';
        const address = document.getElementById('checkout-address')?.value.trim() || 'N/A';

        // Extract payment option (COD or EasyPaisa)
        const paymentElement = document.querySelector('input[name="paymentOption"]:checked');
        const paymentOption = paymentElement ? paymentElement.value : 'Not Selected';

        // Optional: Extract Transaction ID if EasyPaisa was chosen
        let txIdStr = '';
        if (paymentOption === 'EasyPaisa') {
            const txIdInput = document.getElementById('checkout-txId');
            const txId = txIdInput ? txIdInput.value.trim() : '';
            txIdStr = `\n🔹 *Transaction ID:* ${txId || 'Not Provided'}`;
        }

        // 3. Extract financial ledger totals (with defensive fallback selectors)
        const subtotal = document.getElementById('chk-subtotal')?.innerText || '$0.00';
        const shipping = document.getElementById('chk-shipping')?.innerText || '$0.00';
        const tax = document.getElementById('chk-tax')?.innerText || '$0.00';
        const grandTotal = document.getElementById('chk-grandtotal')?.innerText || '$0.00';

        // 4. Construct a clean, professional template message
        const whatsappMessage =
            `🚨 *NEW ORDER MATRIX MANIFEST* 🚨

👤 *CUSTOMER DETAILS:*
• *Name:* ${fullName}
• *Phone:* ${phone}
• *Email:* ${email}

📦 *PRODUCT SPECS:*
• *Size:* ${size}
• *Color:* ${color}

📍 *DELIVERY LOGISTICS:*
• *City:* ${city}
• *Address:* ${address}

💳 *PAYMENT METRICS:*
• *Method:* ${paymentOption}${txIdStr}

💰 *BILLING LEDGER:*
• Sub-Total: ${subtotal}
• Shipping: ${shipping}
• Tax (10%): ${tax}
• *Grand Total:* ${grandTotal}

Please process this transaction sequence!`;

        // 5. Target phone number (Format: International standard without the leading zero)
        const targetNumber = "923181561989";

        // 6. Encode the message text safely for URLs
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // 7. Generate API URL and open in a new browser tab
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    });
}