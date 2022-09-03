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
			<span onclick="loadAllNewsInCategory('${category.category_id}'), toggleSpinner(true)" id="${category.category_id}" class="fw-bold">${category.category_name}</span>
		`;
		categoryNames.appendChild(categoryNameDiv);
		// console.log(category.category_id);
	}
}

loadCategories()

const loadAllNewsInCategory=(id)=>{
	const url=`https://openapi.programming-hero.com/api/news/category/${id}`;
	console.log(url);
	fetch(url)
	.then(res=>res.json())
	.then(data=>displayAllNewsInCategory(data.data))
	.catch(error=>console.log(error))
}


const displayAllNewsInCategory=(news)=>{
	// console.log(news);
	const allNewsContainer=document.getElementById('all-news-container');
	allNewsContainer.innerHTML=``;
	for(const singleNews of news){
		// console.log(singleNews);
		const newsDiv=document.createElement('div');
		newsDiv.classList.add('col');
		newsDiv.innerHTML=`
		<div class="card p-4">
	      <img src="${singleNews.thumbnail_url}" class="card-img-top" alt="...">
	      <div class="card-body">
	        <h5 class="card-title">${singleNews.title}</h5>
	        <p class="card-text">${singleNews.details}</p>
	        <div class="d-flex justify-content-between align-items-center">
	        	<div class="d-flex align-items-center w-50">
	        		<img style="border-radius:50%;" class="img-fluid w-50 p-1" src="${singleNews.author.img}">
	        		<p class="fw-semibold pt-2 pl-2">${singleNews.author.name}</p>
	        	</div>
	        	<div class="d-flex">
	        		<p class="fw-bold">${singleNews.total_view}</p>
	        	</div>
	        </div>
	      </div>
	    </div>
		`;
		allNewsContainer.appendChild(newsDiv);
		toggleSpinner(false);
	}
}

// style="height:1rem, width:1rem, border-radius:50%;"


const toggleSpinner=isLoading=>{
	const loaderSection=document.getElementById('loader');
	if (isLoading) {
		loaderSection.classList.remove('d-none');	
	}
	else{
		loaderSection.classList.add('d-none');
	}

}







// document.getElementById('01').addEventListener('click', function(){
// 	loadAllNewsInCategory('01');
// });



// loadCategories()




// testDiv=document.getElementById('test');
// const newTestDiv=document.createElement('div');
// newTestDiv.innerHTML=`
// 	<span id="69">Blah</span>
// `;
// testDiv.appendChild(newTestDiv);


// document.getElementById('69').addEventListener('click',function(){
// 	console.log("testing");
// });