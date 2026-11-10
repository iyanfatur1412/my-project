const items = document.querySelectorAll('.gallery-item');
const content = document.getElementById("galleryGrid");
const categoryBtn = Array.from(document.querySelectorAll(".filter-btn"));

tampilData();


categoryBtn.map(btn => {
        btn.addEventListener("click", function(e) {
        filterGallery(this.dataset.filter, this);
        // console.log(this.dataset.filter);
    })
})

// Fungsi Filter Kategori (All, Portrait, Landscape)
async function filterGallery(category, event) {
    const data = await getData();

    // Ubah gaya tombol aktif
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-saoBorder', 'text-black', 'font-bold');
        btn.classList.add('bg-transparent', 'text-saoBorder');
    });
    event.classList.add('bg-saoBorder', 'text-black', 'font-bold');
    event.classList.remove('bg-transparent', 'text-saoBorder');


    // Update Tampilan UI
    if(category == "all") {
        tampilData();
        return "";
    }
    const filterData = data.filter(item => item.category == category);
    let card = ""
    filterData.forEach(item => card += elCard(item));
    content.innerHTML = card;
}

// Buka Modal
function openModal(src, title) {
    document.getElementById('modalImg').src = src;
    document.getElementById('modalTitle').innerText = title;
    const modal = document.getElementById('photoModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// Tutup Modal
function closeModal() {
    const modal = document.getElementById('photoModal');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
}



function getData() {
    const data = fetch("data.json").then(response => response.json()).then(response => response).catch(error => error);
    return data;
}

async function tampilData() {
    const data = await getData();
    let card = "";
    data.forEach(item => card += elCard(item));
    content.innerHTML = card;
}

content.addEventListener("click", function(e){
    if(e.target.classList.contains("img-gallery")) {
        const src = e.target.src;
        const title = e.target.alt;
        openModal(src, title);
    }
})



function elCard(data) {
    window.openModal = openModal;
    return `
            <div class="gallery-item group bg-slate-950/60 border border-saoBorder overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_#00d2ff] hover:border-white backdrop-blur-sm" 
                 data-category="${data.category}">
                <div class="overflow-hidden h-52">
                    <img src="${decodeURI(data.img)}" alt="${data.title}" class="img-gallery w-full h-full object-cover border-b border-saoBorder transition-transform duration-500 group-hover:scale-110">
                </div>
                <div class="p-4">
                    <h3 class="font-orbitron text-lg font-bold text-white group-hover:text-saoBorder transition-colors">${data.title}</h3>
                </div>
            </div>            
    `
}