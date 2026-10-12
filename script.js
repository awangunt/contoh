/* =========================================
   1. DATA MENU ASLI INDONESIA (MELAWAI)
   ========================================= */
const menuData = [
    {
        id: 1,
        title: "Kimchi burns my tongue",
        category: "spicy",
        price: 79000,
        image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80",
        description: "Mie kuah pedas kimchi dengan jamur enoki, telur kecap, dan tahu. (Pedas)"
    },
    {
        id: 2,
        title: "I really wants this noodle",
        category: "signature",
        price: 59000,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
        description: "Mie dengan dua jenis ayam, jamur shiitake, dan saus ayam khas."
    },
    {
        id: 3,
        title: "Ayam spicy Lah",
        category: "spicy",
        price: 40000,
        image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
        description: "Mie dengan ayam cincang dan sambal segar. (Pedas)"
    },
    {
        id: 4,
        title: "Indo yum",
        category: "signature",
        price: 45000,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
        description: "Mie dengan ayam cincang, telur goreng, dan saus bawang manis. (Telur kurang matang)"
    },
    {
        id: 5,
        title: "Ayam in Love",
        category: "signature",
        price: 40000,
        image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80",
        description: "Mie dengan ayam dan saus ayam spesial Noodleverse."
    },
    {
        id: 6,
        title: "Truffle trouble",
        category: "signature",
        price: 68000,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
        description: "Mie dengan jamur shiitake, telur, dan minyak truffle. (Telur kurang matang)"
    },
    {
        id: 7,
        title: "Ayam soup for the soul",
        category: "spicy",
        price: 45000,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
        description: "Mie dengan ayam dan kuah ayam hangat yang kaya aroma rempah."
    },
    {
        id: 8,
        title: "Mushroom made me do it",
        category: "signature",
        price: 52000,
        image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
        description: "Mie dengan dua jenis jamur, tempe renyah, dan saus jamur gurih."
    }
];

/* Tautan Resmi Layanan Pesan Antar Melawai */
const gofoodUrl = "https://gofood.co.id/en/jakarta/restaurant/i-want-my-noodle-melawai-a613d624-4963-4473-a79b-cbe3bf33eade";
const grabfoodUrl = "https://food.grab.com/id/en/restaurant/i-want-my-noodle-melawai-delivery/6-C7DUE6EFR22FA6?sourceID=20261010_202122_183929c07d6146b3954f1e5d06e5af42_MEXMPS";

/* =========================================
   2. INITIALIZATION
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    renderMenuItems(menuData);
    init3DScene();
});

/* Render Menu Cards */
function renderMenuItems(items) {
    const grid = document.getElementById("menuGrid");
    grid.innerHTML = "";

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
            <div class="menu-img-wrapper">
                <img src="${item.image}" alt="${item.title}" class="menu-img">
            </div>
            <div class="menu-info">
                <div class="menu-header">
                    <div class="menu-title">${item.title}</div>
                    <div class="menu-price">Rp ${item.price.toLocaleString("id-ID")}</div>
                </div>
                <p class="menu-desc">${item.description}</p>
                <div class="menu-action">
                    <button class="btn btn-secondary" style="padding: 8px 12px; font-size: 0.85rem;" onclick="openDetailModal(${item.id})">Detail</button>
                    <button class="btn btn-gojek" style="padding: 8px 12px; font-size: 0.85rem;" onclick="openGojek()"><i class="fa-solid fa-motorcycle"></i> GoFood</button>
                    <button class="btn btn-grab" style="padding: 8px 12px; font-size: 0.85rem;" onclick="openGrab()"><i class="fa-solid fa-car"></i> Grab</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

/* Category Filter */
function filterMenu(category, event) {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    if (category === "all") {
        renderMenuItems(menuData);
    } else {
        const filtered = menuData.filter(item => item.category === category);
        renderMenuItems(filtered);
    }
}

/* =========================================
   3. MODAL & REDIRECT CONTROLLERS
   ========================================= */
function openDetailModal(id) {
    const item = menuData.find(m => m.id === id);
    const modalBody = document.getElementById("modalBody");
    
    modalBody.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="modal-detail-img">
        <h2>${item.title}</h2>
        <h3 style="color: var(--accent-yellow); margin-bottom: 1rem;">Rp ${item.price.toLocaleString("id-ID")}</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${item.description}</p>
        <button class="btn btn-gojek btn-block" onclick="openGojek()">
            <i class="fa-solid fa-motorcycle"></i> Pesan Langsung di GoFood
        </button>
        <button class="btn btn-grab btn-block" onclick="openGrab()">
            <i class="fa-solid fa-car"></i> Pesan Langsung di GrabFood
        </button>
    `;
    
    document.getElementById("detailModal").style.display = "flex";
}

function closeDetailModal() {
    document.getElementById("detailModal").style.display = "none";
}

function openGojek() {
    window.open(gofoodUrl, '_blank');
}

function openGrab() {
    window.open(grabfoodUrl, '_blank');
}

/* Mobile Drawer Handlers */
function toggleMobileMenu() {
    const drawer = document.getElementById("mobileDrawer");
    drawer.style.display = (drawer.style.display === "flex") ? "none" : "flex";
}

function closeMobileMenu() {
    document.getElementById("mobileDrawer").style.display = "none";
}

/* =========================================
   4. THREE.JS 3D NOODLE BOWL SCENE
   ========================================= */
function init3DScene() {
    const container = document.getElementById("canvas-3d-container");
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const bowlGroup = new THREE.Group();

    // 1. Mangkuk Keramik Dark
    const bowlGeo = new THREE.CylinderGeometry(2, 1.2, 1.2, 32);
    const bowlMat = new THREE.MeshStandardMaterial({ 
        color: 0x1f232d, 
        roughness: 0.3,
        metalness: 0.1 
    });
    const bowl = new THREE.Mesh(bowlGeo, bowlMat);
    bowlGroup.add(bowl);

    // 2. Mi Keriting Khas (Torus Mesh)
    const noodleGeo = new THREE.TorusGeometry(1.4, 0.28, 16, 100);
    const noodleMat = new THREE.MeshStandardMaterial({ 
        color: 0xffb800, 
        roughness: 0.6 
    });
    const noodle = new THREE.Mesh(noodleGeo, noodleMat);
    noodle.rotation.x = Math.PI / 2;
    noodle.position.y = 0.3;
    bowlGroup.add(noodle);

    scene.add(bowlGroup);

    // Pencahayaan
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff5e36, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.set(0, 3, 5);
    camera.lookAt(0, 0, 0);

    // Dynamic Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        bowlGroup.rotation.y += 0.008;
        renderer.render(scene, camera);
    }
    animate();

    // Auto-resize
    window.addEventListener("resize", () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}