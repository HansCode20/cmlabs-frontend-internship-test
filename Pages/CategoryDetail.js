 // Toggle mobile menu
 $('#menu-toggle').on('click', function () {
    $('#mobile-menu').toggleClass('hidden');
});

$(document).ready(function () {
    const mealList = $('#categories-Filter');
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category) {
        // Menggunakan jQuery AJAX untuk mendapatkan kategori
        $.ajax({
            url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
            method: 'GET',
            success: function (response) {
                const meals = response.meals;

                // Pengecekan apakah meals terdefinisi dan merupakan array
                if (meals && Array.isArray(meals)) {
                    // Menampilkan kategori di halaman
                    meals.forEach((meal) => {
                        const mealItem = `
                        <div class="relative">
                            <a href="./MealDetail.html?detail=${meal.idMeal}" class="w-full h-full block">
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-40 object-cover">
                                <div class="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/50 rounded-lg">
                                    <h2 class="text-xl font-bold mt-4 text-center">${meal.strMeal}</h2>
                                </div>
                            </a>
                        </div>`;
                        mealList.append(mealItem);
                    });
                } else {
                    console.error("No categories found.");
                }
            },
            error: function (error) {
                console.error("Error fetching categories:", error);
            }
        });
    } else {
        console.error("No Category Selected");
    }
});