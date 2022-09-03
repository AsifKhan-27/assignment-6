const loadCategories=()=>{
	const url=`https://openapi.programming-hero.com/api/news/categories`;
	fetch(url)
	.then(res=>res.json())
	.then(data=>displayCategories(data.data.news_category))
	.catch(error=>console.log(error))
}

const displayCategories=(categories)=>{
	// console.log(categories);
	const categoryNames=document.getElementById('category-names');
	for(const category of categories){
		// console.log(category.category_name);
		const categoryNameDiv=document.createElement('div');
		categoryNameDiv.innerHTML=`
			<span id='${category.category_id}'>${category.category_name}</span>
		`;
		categoryNames.appendChild(categoryNameDiv);
	}
}

loadCategories()