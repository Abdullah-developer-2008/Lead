/**
 * NAVBAR.JS - UNIFIED GLOBAL WEBSITE AUTHENTICATION ENGINE
 * Synchronizes login states, dropdown controls, and cross-tab triggers perfectly.
 */

function enforceNavbarSessionStateCompilation() {
    // Desktop View Components
    const guestLinks = document.getElementById('nav-guest-links');
    const userProfileZone = document.getElementById('nav-user-profile');
    const avatarBadge = document.getElementById('user-avatar-badge');
    const userDisplayName = document.getElementById('user-display-name');

    // Mobile View Components
    const guestLinksMobile = document.getElementById('nav-guest-links-mobile');
    const userProfileZoneMobile = document.getElementById('nav-user-profile-mobile');
    const avatarBadgeMobile = document.getElementById('user-avatar-badge-mobile');
    const userDisplayNameMobile = document.getElementById('user-display-name-mobile');

    const token = localStorage.getItem('userAuthToken');
    const rawProfileData = localStorage.getItem('userDataProfile');

    if (token && rawProfileData) {
        try {
            const profile = JSON.parse(rawProfileData);
            const nameString = profile.fullName || profile.name || "User";

            // Map data attributes to Desktop
            if (userDisplayName) userDisplayName.textContent = nameString;
            if (avatarBadge) avatarBadge.textContent = nameString.trim().charAt(0).toUpperCase();

            // Map data attributes to Mobile Drawer
            if (userDisplayNameMobile) userDisplayNameMobile.textContent = nameString;
            if (avatarBadgeMobile) avatarBadgeMobile.textContent = nameString.trim().charAt(0).toUpperCase();

            // Toggle active Desktop blocks
            if (guestLinks) guestLinks.style.setProperty('display', 'none', 'important');
            if (userProfileZone) userProfileZone.style.setProperty('display', 'flex', 'important');

            // Toggle active Mobile blocks
            if (guestLinksMobile) guestLinksMobile.style.setProperty('display', 'none', 'important');
            if (userProfileZoneMobile) userProfileZoneMobile.style.setProperty('block', 'important');

        } catch (err) {
            console.error("Auth initialization exception encountered:", err);
            localStorage.removeItem('userAuthToken');
            localStorage.removeItem('userDataProfile');
        }
    } else {
        // Fallback states for logged-out actions
        if (guestLinks) guestLinks.style.setProperty('display', 'flex', 'important');
        if (userProfileZone) userProfileZone.style.setProperty('none', 'important');

        if (guestLinksMobile) guestLinksMobile.style.setProperty('display', 'flex', 'important');
        if (userProfileZoneMobile) userProfileZoneMobile.style.setProperty('display', 'none', 'important');
    }
}

// Bind mobile button UI behaviors smoothly
document.addEventListener('DOMContentLoaded', () => {
    enforceNavbarSessionStateCompilation();

    const loginMobile = document.getElementById('nav-login-trigger-mobile');
    const signupMobile = document.getElementById('nav-signup-trigger-mobile');
    const logoutMobile = document.getElementById('session-logout-btn-mobile');
    const authOverlay = document.getElementById('auth-overlay');
    const drawer = document.getElementById('mobile-menu-drawer');
    const toggleBtn = document.getElementById('menu-toggle-btn');

    const closeMobileDrawer = () => {
        if (drawer) drawer.classList.remove('menu-is-open');
        if (toggleBtn) toggleBtn.classList.remove('toggle-active');
    };

    if (loginMobile && authOverlay) {
        loginMobile.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileDrawer();
            authOverlay.style.display = 'flex';
        });
    }

    if (signupMobile && authOverlay) {
        signupMobile.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileDrawer();
            authOverlay.style.display = 'flex';
        });
    }

    if (logoutMobile) {
        logoutMobile.addEventListener('click', () => {
            localStorage.removeItem('userAuthToken');
            localStorage.removeItem('userDataProfile');
            window.location.reload();
        });
    }
});

// Broadcast changes instantly across other opened background windows/tabs
window.addEventListener('storage', (event) => {
    if (event.key === 'userAuthToken' || event.key === 'userDataProfile') {
        enforceNavbarSessionStateCompilation();
    }
});

// Routing link jump assistant setup
window.navigateToCart = function (event) {
    if (event) event.preventDefault();
    const isInsidePagesFolder = window.location.pathname.includes('/pages/');
    window.location.href = isInsidePagesFolder ? 'cart.html' : 'pages/cart.html';
};

// =========================================================================
// INTERACTIVE MODE: PRODUCT DETAILS SPECIFICATION & CART CONVERGENCE ENGINE
// =========================================================================

// Local variables to track the modal's working memory state
let activeSelectedProductData = null;
// Switched to global property to prevent re-declaration conflicts with shop.html scripts
window.activeSelectedSizeToken = "";
let activeQuantityMultiplier = 1;

// Catalog Registry Database Array containing human-friendly product matrices
const internalGlobalProductCatalog = [
    {
        id: "PROD_091",
        title: "Luxury Kit Edition",
        price: 85.00,
        category: "Apparel",
        stockStatus: "500 UNITS GLOBAL LIMIT",
        description: "Designed for premium lifestyle comfort and pristine style, this high-end FutDrip engineered oversized silhouette kit is crafted from structural breathable heavy matrix weave fibers. Perfect for top-tier street configuration arrangements and daily high-output usage loops.",
        features: [
            "Premium grade 280GSM high-gauge performance tactical yarn format.",
            "Structural shape retention perimeter stitching prevents weave warping.",
            "Integrated custom luxury emblem branding shield applied cleanly."
        ],
        image: "../images/logo.jpeg"
    },
    {
        id: "PROD_092",
        title: "MCITY PREMIER KIT",
        price: 95.00,
        category: "Apparel",
        stockStatus: "LIMITED FIELD RUN",
        description: "An absolute masterclass in professional match wear construction architecture. Built using lightweight mesh configurations that wick sweat parameters instantaneously while delivering bold club identity markers.",
        features: [
            "Athletic true-to-body tapered premium kit form layout.",
            "Advanced moisture-transport infrastructure weave channels.",
            "Anti-friction comfort lock stitching elements throughout."
        ],
        image: "../images/logo.jpeg"
    }
];

// --- 1. Product Image Magnification Hover Zoom Engine Logic ---
const zoomLensWrapper = document.querySelector('.zoom-lens-wrapper');
const detailProductImg = document.getElementById('detail-product-img');

if (zoomLensWrapper && detailProductImg) {
    zoomLensWrapper.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = zoomLensWrapper.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        detailProductImg.style.transformOrigin = `${x}% ${y}%`;
        detailProductImg.style.transform = 'scale(1.8)';
    });

    zoomLensWrapper.addEventListener('mouseleave', () => {
        detailProductImg.style.transform = 'scale(1)';
        detailProductImg.style.transformOrigin = 'center center';
    });
}

// --- 2. Central Modal Orchestration Router Function ---
// FIXED: Added contextual customImgSrc string fallback handling parameter to prevent over-writing to standard placeholder logo
window.launchProductDetailsViewPipeline = function (productId, customImgSrc = null) {
    // Locate the structural matching asset metrics inside registry catalog
    const productAsset = internalGlobalProductCatalog.find(item => item.id === productId) || {
        id: productId,
        title: "Premium FutDrip Core Product",
        price: 85.00,
        category: "Apparel",
        stockStatus: "ALLOCATION AVAILABLE",
        description: "Designed for comfort and style, this premium FutDrip selection is crafted from high-quality breathable fabric. Perfect for casual wear, streetwear, and everyday outfits.",
        features: ["Premium structural fiber configurations.", "Designed for optimal everyday movement."],
        image: customImgSrc || "images/logo.jpeg"
    };

    // Cache metrics reference into active operational state variables memory
    activeSelectedProductData = productAsset;
    window.activeSelectedSizeToken = "";
    activeQuantityMultiplier = 1;

    // Flush and reset component style states safely using defensive selectors
    const validationError = document.getElementById('size-validation-error');
    if (validationError) validationError.style.display = 'none';

    const qtyValText = document.getElementById('qty-current-val');
    if (qtyValText) qtyValText.textContent = activeQuantityMultiplier;

    document.querySelectorAll('.size-select-node').forEach(btn => {
        btn.style.background = '#ffffff';
        btn.style.color = '#001B5E';
        btn.style.borderColor = 'rgba(0,27,94,0.15)';
    });

    // Populate interface elements dynamically with strict safety null checks
    const nameNode = document.getElementById('detail-product-name');
    const priceNode = document.getElementById('detail-product-price');
    const catNode = document.getElementById('detail-product-cat');
    const stockNode = document.getElementById('detail-product-stock');
    const descNode = document.getElementById('detail-product-desc');
    
    // Check multiple possible locations for your main product modal images
    const imgNode = document.getElementById('detail-product-img') || 
                    document.getElementById('detail-main-view-image') || 
                    document.querySelector('.product-matrix-visuals img') || 
                    document.getElementById('modal-product-img');

    // FIXED: Use the specific card image path passed down from the interceptor, if available
    if (imgNode) {
        imgNode.src = customImgSrc || productAsset.image;
    }
    if (nameNode) nameNode.textContent = productAsset.title.toUpperCase();
    if (priceNode) priceNode.textContent = `$${productAsset.price.toFixed(2)}`;
    if (catNode) catNode.textContent = productAsset.category;
    if (stockNode) stockNode.textContent = productAsset.stockStatus;
    if (descNode) descNode.textContent = productAsset.description;

    // Compile dynamic feature rows safely
    const featuresContainer = document.getElementById('detail-product-features');
    if (featuresContainer) {
        featuresContainer.innerHTML = productAsset.features.map(feat => `<li>${feat}</li>`).join('');
    }

    // Generate Dynamic Cross-Reference Related Products row items
    compileRelatedCrossReferenceMesh(productAsset.category, productAsset.id);

    // Open structural modal layout view smoothly
    const detailModalElement = document.getElementById('product-details-modal');
    if (detailModalElement) detailModalElement.style.display = 'flex';
};

// --- 3. Size Selection Node Grid Observers ---
document.querySelectorAll('.size-select-node').forEach(button => {
    button.addEventListener('click', () => {
        const validationError = document.getElementById('size-validation-error');
        if (validationError) validationError.style.display = 'none';

        // Clear past active button visuals
        document.querySelectorAll('.size-select-node').forEach(btn => {
            btn.style.background = '#ffffff';
            btn.style.color = '#001B5E';
            btn.style.borderColor = 'rgba(0,27,94,0.15)';
        });

        // Set new active state values
        window.activeSelectedSizeToken = button.getAttribute('data-size');
        button.style.background = '#001B5E';
        button.style.color = '#B6FF00';
        button.style.borderColor = '#001B5E';
    });
});

// --- 4. Quantity Multiplier Control Steppers ---
const incrementBtn = document.getElementById('qty-increment-btn');
const decrementBtn = document.getElementById('qty-decrement-btn');
const qtyDisplayNode = document.getElementById('qty-current-val');

if (incrementBtn && decrementBtn && qtyDisplayNode) {
    incrementBtn.addEventListener('click', () => {
        activeQuantityMultiplier++;
        qtyDisplayNode.textContent = activeQuantityMultiplier;
    });

    decrementBtn.addEventListener('click', () => {
        if (activeQuantityMultiplier > 1) {
            activeQuantityMultiplier--;
            qtyDisplayNode.textContent = activeQuantityMultiplier;
        }
    });
}

// --- 5. Modal Dismount Management Elements ---
const closeDetailsModalBtn = document.getElementById('close-details-modal-btn');
if (closeDetailsModalBtn) {
    closeDetailsModalBtn.addEventListener('click', () => {
        const detailModalElement = document.getElementById('product-details-modal');
        if (detailModalElement) detailModalElement.style.display = 'none';
    });
}

// --- 6. Related Products Content Generator Logic ---
function compileRelatedCrossReferenceMesh(currentCategory, currentProductId) {
    const meshContainer = document.getElementById('related-products-mesh');
    if (!meshContainer) return;

    // Filter matching categories without duplicating current open card item
    const matches = internalGlobalProductCatalog.filter(item => item.category === currentCategory && item.id !== currentProductId);

    // Fallback block standard loop generation if catalog has limited items
    const resolutionPool = matches.length > 0 ? matches : internalGlobalProductCatalog.slice(0, 4);

    meshContainer.innerHTML = resolutionPool.map(prod => `
        <div onclick="launchProductDetailsViewPipeline('${prod.id}')" style="flex: 1; min-width: 100px; max-width: 22%; cursor: pointer; border: 1px solid rgba(0,27,94,0.05); padding: 8px; border-radius: 8px; background: #ffffff; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
            <img src="${prod.image}" style="width: 100%; height: 80px; object-fit: cover; border-radius: 4px; margin-bottom: 5px;">
            <div style="font-size: 0.7rem; font-weight: 800; color: #001B5E; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${prod.title.toUpperCase()}</div>
            <div style="font-size: 0.75rem; font-weight: 700; color: #5b6b94;">$${prod.price.toFixed(2)}</div>
        </div>
    `).join('');
}

// --- 7. Central Order Add To Cart Dispatch Transaction Flow Pipeline ---
const modalAddToCartTrigger = document.getElementById('modal-add-to-cart-trigger');
if (modalAddToCartTrigger) {
    modalAddToCartTrigger.addEventListener('click', async () => {
        // Validation check: Ensure size token parameter variable state is defined
        if (!window.activeSelectedSizeToken) {
            const validationError = document.getElementById('size-validation-error');
            if (validationError) validationError.style.display = 'block';
            return;
        }

        // Authentication evaluation step: Access core session tokens
        const trackingToken = localStorage.getItem('userAuthToken') || localStorage.getItem('authToken');
        if (!trackingToken) {
            const detailModalElement = document.getElementById('product-details-modal');
            if (detailModalElement) detailModalElement.style.display = 'none';

            const loginModalElement = document.getElementById('auth-overlay');
            if (loginModalElement) loginModalElement.style.display = 'flex';

            if (typeof displaySystemModal === "function") {
                displaySystemModal("✕ Authentication Required", "Please log into your account terminal matrix to synchronize private cart ledger networks.", "error");
            }
            return;
        }

        // Dispatch dynamic payload package downstream to database tracking routes
        try {
            const packagePayload = {
                productId: activeSelectedProductData.id,
                title: `${activeSelectedProductData.title} (${window.activeSelectedSizeToken})`,
                price: activeSelectedProductData.price,
                quantity: activeQuantityMultiplier
            };

            const serverTransmissionResponse = await fetch('http://localhost:5000/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${trackingToken}`
                },
                body: JSON.stringify(packagePayload)
            });

            if (serverTransmissionResponse.ok) {
                // Update navigation count interface layers
                if (typeof syncCartCounterVisualTelemetry === "function") syncCartCounterVisualTelemetry();

                const detailModalElement = document.getElementById('product-details-modal');
                if (detailModalElement) detailModalElement.style.display = 'none';

                if (typeof displaySystemModal === "function") {
                    displaySystemModal("✓ Allocation Secured", "Product successfully synchronized into your secure cloud user ledger profile tracking data.", "success");
                } else {
                    alert("Product added to cart successfully.");
                }
            } else {
                alert("Database synchronization routing rejected this cart allocation token request packet.");
            }
        } catch (err) {
            console.error("CRITICAL VEHICLE CART PIPELINE FAULT EXCEPTION:", err);
        }
    });
}

// --- 8. Instant Buy Now Routing Matrix Logic ---
const modalBuyNowTrigger = document.getElementById('modal-buy-now-trigger');
if (modalBuyNowTrigger) {
    modalBuyNowTrigger.addEventListener('click', () => {
        if (!window.activeSelectedSizeToken) {
            const validationError = document.getElementById('size-validation-error');
            if (validationError) validationError.style.display = 'block';
            return;
        }

        // Store single transient tracking item directly inside storage registers for checkout retrieval
        const instantPurchaseContext = {
            productId: activeSelectedProductData.id,
            title: `${activeSelectedProductData.title} (${window.activeSelectedSizeToken})`,
            price: activeSelectedProductData.price,
            quantity: activeQuantityMultiplier,
            checkoutMode: "DIRECT_IMMEDIATE_BYPASS"
        };

        localStorage.setItem('transientCheckoutManifest', JSON.stringify(instantPurchaseContext));

        // Redirect directly inside checkout execution window
        window.location.href = 'cart.html';
    });
}

// --- Protected WhatsApp Inquiry Handshake Engine ---
const modalWhatsAppTrigger = document.getElementById('modal-whatsapp-trigger');
if (modalWhatsAppTrigger) {
    modalWhatsAppTrigger.addEventListener('click', (event) => {
        event.preventDefault();

        // 1. Session state verification check
        const trackingToken = localStorage.getItem('userAuthToken') || localStorage.getItem('authToken');
        if (!trackingToken) {
            // Unmount current open product details frame to prevent overlay stacking
            const detailModalElement = document.getElementById('product-details-modal');
            if (detailModalElement) detailModalElement.style.display = 'none';

            // Reveal the primary authorization overlay entry matrix modal
            const loginModalElement = document.getElementById('auth-overlay');
            if (loginModalElement) loginModalElement.style.display = 'flex';

            // Fire high-end telemetry notification banner if application engine permits
            if (typeof displaySystemModal === "function") {
                displaySystemModal(
                    "✕ Authentication Required",
                    "Please access or create an account profile to authorize direct order inquiries via WhatsApp.",
                    "error"
                );
            } else {
                alert("Please log in to continue your order on WhatsApp.");
            }
            return;
        }

        // 2. Memory context safety fallback validation
        // Checks if product catalog tracking variables exist inside application runtime
        const targetProduct = activeSelectedProductData || { title: "Premium Item", price: 0.00 };

        // 3. Dynamic payload data string compilation
        const businessPhoneNumber = "923181561989"; // <-- Update with your exact WhatsApp delivery phone number link
        const selectedSize = window.activeSelectedSizeToken ? ` (Size: ${window.activeSelectedSizeToken})` : "";
        const trackingQty = typeof activeQuantityMultiplier !== 'undefined' ? activeQuantityMultiplier : 1;
        const quantityText = trackingQty > 1 ? ` [Quantity: ${trackingQty}]` : "";

        const plainTextMessage = `Hello, I'd like to initialize an order for "${targetProduct.title.toUpperCase()}"${selectedSize}${quantityText} valued at $${targetProduct.price.toFixed(2)}. Can you help me secure this configuration allocation?`;
        const webSafeEncodedMessage = encodeURIComponent(plainTextMessage);

        // 4. Clean tab-redirect routing forwarder execution
        const secureWhatsAppEndpoint = `https://wa.me/${businessPhoneNumber}?text=${webSafeEncodedMessage}`;
        window.open(secureWhatsAppEndpoint, '_blank');
    });

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
}
// --- 9. Interface Bridge Binder: Hook elements to existing standard list layouts ---
function integrateGlobalClickInterceptorsToProductGridCards() {
    document.querySelectorAll('.product-card').forEach(card => {
        if (card.getAttribute('data-pipeline-bound') === 'true') return;

        card.style.cursor = 'pointer';
        card.addEventListener('click', (event) => {
            if (event.target.closest('.action-overlay') || event.target.closest('.btn-quick-add')) {
                return;
            }

            // 1. Unhide/display the target overlay modal container front & center
            const detailsModal = document.getElementById('product-details-modal');
            if (detailsModal) {
                detailsModal.style.display = 'flex';
                detailsModal.classList.add('active-view');
            }

            // 2. Safely extract specific properties from the clicked product card elements
            const cardTitle = card.querySelector('.prod-title')?.textContent || "Premium Item Specification";
            const cardPrice = card.querySelector('.prod-price')?.textContent || "$0.00";
            const cardCategory = card.querySelector('.prod-cat')?.textContent || "Apparel // Gear";

            // FIXED: Look for any image container layout variations inside the card safely
            const cardImgSrc = card.querySelector('.product-img-holder img')?.getAttribute('src') || 
                               card.querySelector('img')?.getAttribute('src') || 
                               '../images/logo.jpeg';

            // 3. Inject the extracted specific item info directly into your modal UI nodes
            const modalTitleNode = document.getElementById('detail-product-name');
            const modalPriceNode = document.getElementById('detail-product-price');
            const modalCatNode = document.getElementById('detail-product-cat');
            const modalImgNode = document.getElementById('detail-product-img') || 
                                 document.getElementById('detail-main-view-image') || 
                                 document.querySelector('.product-matrix-visuals img') || 
                                 document.getElementById('modal-product-img');

            if (modalTitleNode) modalTitleNode.textContent = cardTitle.toUpperCase();
            if (modalPriceNode) modalPriceNode.textContent = cardPrice;
            if (modalCatNode) modalCatNode.textContent = cardCategory.toUpperCase();
            if (modalImgNode) {
                modalImgNode.setAttribute('src', cardImgSrc);
            }

            // 4. FIXED: Pass cardImgSrc down as the second argument so the pipeline preserves it 
            const assignedProdId = card.getAttribute('data-product-id') || 'PROD_091';
            if (typeof launchProductDetailsViewPipeline === "function") {
                launchProductDetailsViewPipeline(assignedProdId, cardImgSrc);
            }
        });

        card.setAttribute('data-pipeline-bound', 'true');
    });
}

// Run mapping attachment process
setTimeout(integrateGlobalClickInterceptorsToProductGridCards, 600);