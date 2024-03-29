class Recipe {
    // constructor(id, image, name,  servings, ingredients, time, description, appliance, ustensils) {
    constructor(recipe) {
        this.id = recipe.id;
        this.image = recipe.image;
        this.name = recipe.name;
        this.servings = recipe.servings;
        this.ingredients = recipe.ingredients;
        this.time = recipe.time;
        this.description = recipe.description;
        this.appliance = recipe.appliance;
        this.ustensils = recipe.ustensils;
    }


    containsInName(value) {
        if(this.name.toLowerCase().includes(value.toLowerCase().trim())) {
            return true;
        }
        return false;
    }

    containsInDescription(value) {
        if(this.description.toLowerCase().includes(value.toLowerCase().trim())) {
            return true;
        }
        return false;
    }

    containsInIngredient(value) {
        let contains = false;
        this.ingredients.forEach(ingredient => {
            if(ingredient.ingredient.toLowerCase().includes(value.toLowerCase().trim())) {
                contains = true;
            }
        });
        return contains;
    }

    containsAllIngredients(selectedIngredients) {
        if(selectedIngredients.size == 0) {
            return true;
        }
        let counter = 0;
        selectedIngredients.forEach(selectedIngredient => {
            this.ingredients.forEach(ingredient => {
                if(ingredient.ingredient.toLowerCase() == selectedIngredient) {
                    counter++;
                }
            });
        });

        if(counter == selectedIngredients.size) {
            return true;
        }
        return false;
    }

    containsAllAppliances(selectedAppliances) {
        if(selectedAppliances.size == 0) {
            return true;
        }
        if(selectedAppliances.size > 1) {
            return false
        }
        let contains = false;
        selectedAppliances.forEach(selectedAppliance => {
            if(this.appliance.toLowerCase() == selectedAppliance) {
                contains = true;
            }
        });
        return contains;
    }

    containsAllUstensils(selectedUstensils) {
        if(selectedUstensils.size == 0) {
            return true;
        }
        let counter = 0;
        selectedUstensils.forEach(selectedUstensil => {
            this.ustensils.forEach(ustensil => {
                if(ustensil.toLowerCase() == selectedUstensil) {
                    counter++;
                }
            });
        });

        if(counter == selectedUstensils.size) {
            return true;
        }
        return false;
    }

    build() {
        let article = document.createElement('article');
        article.className = "card";

        let cardHeader = document.createElement('div');
        cardHeader.className = "card-header";

        let img = document.createElement('img');
        img.setAttribute('src', `assets/img/Recettes/${this.image}`);
        img.setAttribute('alt', `Une photo de la recette ${this.name}`);
        img.className = "cardImg";

        let cardBody = document.createElement('div');
        cardBody.className="card-body";
        
        let h3 = document.createElement('h3');
        h3.className = "cardTitle";
        h3.textContent = this.name;
        
        let recipeDiv = document.createElement('div');
        recipeDiv.className = "recipe";

        let recipeTitle = document.createElement('h4');
        recipeTitle.className = "cardrecipeTitle";
        recipeTitle.textContent = "Recette";

        let recipeTxt = document.createElement('p');
        recipeTxt.className = "cardRecipe";
        recipeTxt.textContent = this.description;

        let ingredientsDiv = document.createElement('div');
        ingredientsDiv.className = "ingredients";

        let ingredientsTitle = document.createElement('h4');
        ingredientsTitle.className = "cardIngredients";
        ingredientsTitle.textContent = "Ingredients";

        let ul = document.createElement('ul');

        let li;
        this.ingredients.forEach(ingr => {
            li = document.createElement('li');
            li.className = "ingredient";

            let ingredientName = document.createElement('p');
            ingredientName.className = "ingredientName";
            ingredientName.textContent = ingr.ingredient;


            li.appendChild(ingredientName);

            if('quantity' in ingr) {
                let quantity = document.createElement('p');
                quantity.className = "ingredientQty";
                quantity.textContent = ingr.quantity;

                if('unit' in ingr) {
                    let unit = document.createElement('span');
                    unit.className = "ingrdientUnit";
                    unit.textContent = ingr.unit;
        
                    quantity.appendChild(unit);
                }

                li.appendChild(quantity);
            }
            ul.appendChild(li);
        });

        let time = document.createElement('span');
        time.className = "preparationTime";
        time.textContent = this.time + ' min';


        ingredientsDiv.appendChild(ingredientsTitle);
        ingredientsDiv.appendChild(ul);

        recipeDiv.appendChild(recipeTitle);
        recipeDiv.appendChild(recipeTxt);

        cardBody.appendChild(h3);
        cardBody.appendChild(recipeDiv);
        cardBody.appendChild(ingredientsDiv);
        
        cardHeader.appendChild(img);

        article.appendChild(time);
        article.appendChild(cardHeader);
        article.appendChild(cardBody);


        return article;
    }
}
