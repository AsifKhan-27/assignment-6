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
	categories.forEach(category=>{
		// console.log(category.category_name);
		const categoryNameDiv=document.createElement('div');
		categoryNameDiv.innerHTML=`
			<span onclick="loadAllNewsInCategory('${category.category_id}','${category.category_name}'), toggleSpinner(true)" id="${category.category_id}" class="fw-bold">${category.category_name}</span>
		`;
		categoryNames.appendChild(categoryNameDiv);
		// console.log(category.category_id);
	});
}

loadCategories()

const loadAllNewsInCategory=(categoryId,categoryName)=>{
	const url=`https://openapi.programming-hero.com/api/news/category/${categoryId}`;
	fetch(url)
	.then(res=>res.json())
	.then(data=>displayAllNewsInCategory(data.data,categoryName))
	.catch(error=>console.log(error))
}


const displayAllNewsInCategory=(news,categoryName)=>{
	// No of news items
	const noOfNewsSection=document.getElementById('no-of-news');
	if(news.length!==0){
		noOfNewsSection.innerText=`${news.length} items found for category ${categoryName}`;
	}
	else{
		noOfNewsSection.innerText=`No items found for category ${categoryName}`;
		toggleSpinner(false);
	}	

	// sort all news for category by views
	news.sort((a,b)=>{
		return b.total_view-a.total_view;
	});
	
	// add all news for category
	const allNewsContainer=document.getElementById('all-news-container');
	allNewsContainer.innerHTML=``;
	news.forEach(singleNews=>{
		// console.log(singleNews);
		const newsDiv=document.createElement('div');
		newsDiv.classList.add('col');
		newsDiv.innerHTML=`
		<div class="card p-4">
	      <img src="${singleNews.thumbnail_url}" class="card-img-top" alt="...">
	      <div class="card-body">
	        <h5 class="card-title">${singleNews.title}</h5>
	        <p class="card-text news-text">${singleNews.details}</p>
	        <div class="d-flex justify-content-between align-items-center">
	        	<div class="d-flex align-items-center w-50">
	        		<img style="border-radius:50%;" class="img-fluid w-50 p-1" src="${singleNews.author.img}">
	        		<p class="fw-semibold pt-2 pl-2">${singleNews.author.name}</p>
	        	</div>
	        	<div class="d-flex ">
	        		<i class="fa-regular fa-eye me-2 mt-1"></i>
	        		<p class="fw-bold pe-1">${singleNews.total_view}</p>
	        	</div>
	        	<button onclick="loadNewsDetails('${singleNews._id}')" href="#" class="btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#newsDetailModal">->
	        	</button>	
	        </div>
	      </div>
	    </div>
		`;
		allNewsContainer.appendChild(newsDiv);
		toggleSpinner(false);
	});
}



const loadNewsDetails=(id)=>{
	const url=`https://openapi.programming-hero.com/api/news/${id}`;
	fetch(url)
	.then(res=>res.json())
	.then(data=>displayNewsDetails(data.data[0]))
	.catch(error=>console.log(error))
}


const displayNewsDetails=news=>{
	const modalTitle=document.getElementById('newsDetailModalLabel');
	modalTitle.innerText=news.title;
	const newsDetails=document.getElementById('news-details');
	newsDetails.innerHTML=`
		<p>Publish Date: ${news.author.published_date? news.author.published_date:'No Publish Date Found'}</p>
		<p>Total Views: ${news.total_view? news.total_view:'Number of Views Not Found'}</p>
		<p>Author Name: ${news.author.name? news.author.name: 'No Author Name Found'}</p>
		<img src="${news.thumbnail_url}">
		<p>${news.details}</p>
	`;
}


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



// testDiv=document.getElementById('test');
// const newTestDiv=document.createElement('div');
// newTestDiv.innerHTML=`
// 	<span id="69">Blah</span>
// `;
// testDiv.appendChild(newTestDiv);


// document.getElementById('69').addEventListener('click',function(){
// 	console.log("testing");
// });