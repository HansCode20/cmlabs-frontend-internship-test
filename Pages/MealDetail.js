  // Toggle mobile menu
  $('#menu-toggle').click(function () {
    $('#mobile-menu').toggleClass('hidden');
});

$(document).ready(function () {
    const detailsList = $('#detail-Filter');
    const urlParams = new URLSearchParams(window.location.search);
    const detail = urlParams.get('detail');

    if (detail) {
        fetchDetail(detail);
    } else {
        console.error("No Detail Selected");
    }

    async function fetchDetail(detail) {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detail}`);
            const details = response.data.meals;

            if (details && Array.isArray(details)) {
                details.forEach((meal) => {
                    // Pisahkan instruksi berdasarkan titik
                    const instructions = meal.strInstructions.split('.').filter(Boolean);

                    const formattedInstructions = instructions.reduce((acc, instruction, index) => {
                        if (index % 3 === 0) {
                            acc.push(`<p class="mb-4">${instruction.trim()}.</p>`);
                        } else {
                            acc[acc.length - 1] = acc[acc.length - 1].replace('</p>', ` ${instruction.trim()}.</p>`);
                        }
                        return acc;
                    }, []).join('');

                    const ingredients = [];
                    for (let i = 1; i <= 20; i++) {
                        const ingredient = meal[`strIngredient${i}`];
                        const measure = meal[`strMeasure${i}`];
                        if (ingredient && ingredient.trim() !== "") {
                            ingredients.push(`${ingredient} - ${measure}`);
                        }
                    }

                    const ingredientsList = ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');

                    const youtubeUrl = meal.strYoutube ? meal.strYoutube.replace("watch?v=", "embed/") : null;

                    const detailItem = `
                    <div class="space-y-10">
                        <h1 class="text-5xl font-normal mt-4">${meal.strMeal}</h1>
                        <hr class="border border-2" />
                        <h2 class="text-red-500">${meal.strArea} & ${meal.strTags}</h2>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-10"> 
                            <!-- Gambar -->
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-full object-cover rounded-lg">
                            
                            <!-- Instruksi dan bahan -->
                            <div>
                                <h3 class="text-2xl font-bold">Ingredients:</h3>
                                <ul class="list-disc ml-5 mb-5 ">
                                    ${ingredientsList}
                                </ul>

                                <h3 class="text-2xl font-bold">Instructions:</h3>
                                ${formattedInstructions}
                            </div>
                        </div>

                        <div>
                            ${youtubeUrl ? `<iframe class="w-full h-96" src="${youtubeUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` : ''}
                        </div>
                    </div>`;
                    detailsList.append(detailItem);
                });
            } else {
                console.error("No details found.");
            }
        } catch (error) {
            console.error("Error fetching details:", error);
        }
    }
});