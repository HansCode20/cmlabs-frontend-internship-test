$(document).ready(function() {
    // Toggle mobile menu
    $('#menu-toggle').click(function() {
        $('#mobile-menu').toggleClass('hidden');
    });

    // Fetch categories when DOM is ready
    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
            return response.data.categories;
        } catch (error) {
            console.error("Error fetching categories:", error);
            return [];
        }
    };

    // Menampilkan kategori di halaman
    fetchCategories().then(function(categories) {
        const $categoriesList = $('#categories-list');
        if (categories && Array.isArray(categories)) {
            categories.forEach(function(category) {
                const categoryItem = `
                <div class="relative">
                    <div class="relative group">
                        <a href="./CategoryDetail.html?category=${category.strCategory}" class="w-full h-full block">
                            <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="w-full h-40 object-cover">
                            <div class="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/50 rounded-lg">
                                <h2 class="text-xl font-bold mt-4 text-center">${category.strCategory}</h2>
                            </div>
                        </a>
                    </div>
                </div>
                `;
                $categoriesList.append(categoryItem);
            });
        } else {
            console.error("No categories found.");
        }
    });
});