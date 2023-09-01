let allCards = [];
let musicCards = [];
let comedyCards = [];

const handleCategory = async () => {
  const res = await fetch(
    'https://openapi.programming-hero.com/api/videos/categories'
  );
  const data = await res.json();
  const trimedData = data.data;
  const tabContainer = document.getElementById('tab-container');
  // console.log(trimedData[0].category_id);
  trimedData.forEach(category => {
    const div = document.createElement('div');
    div.innerHTML = `
    <a class="tab  bg-slate-300 mr-4 rounded-lg hover:bg-red-600 hover:text-white" onclick="handleLoadCard(${category.category_id})">${category.category}</a>
  `;
    tabContainer.appendChild(div);
    handleLoadCard(trimedData[0].category_id);
  });
};
const handleLoadCard = async categoryId => {
  // console.log(categoryId);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();
  const trimedCard = data.data;
  // console.log(trimedCard);
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';
  // console.log(shortByViewsFlag);

  if (trimedCard.length === 0) {
    cardContainer.classList = `w-full mx-auto`;
    const emptyCard = document.createElement('div');
    emptyCard.classList = ` bg-base-100 w-4/5 lg:w-2/5 mx-auto py-7 shadow-xl lg:p-10 grid grid-cols-1 `;
    emptyCard.innerHTML = `
    <img src="image/icon.png" alt="" class=" lg:h-40 lg:w-40 mx-auto" />
    <h2 class="text-3xl font-bold  text-center">Oops!! Sorry, There is no content here</h2>
    `;
    cardContainer.appendChild(emptyCard);
  } else {
    allCards = [];
    musicCards = [];
    comedyCards = [];
    cardContainer.classList = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full`;
    trimedCard.forEach(card => {
      console.log(card);
      const cardItem = document.createElement('div');
      cardItem.classList = `bg-base-100 shadow-xl p-5`;
      cardItem.innerHTML = `
          <figure class=" relative">
          <div class="w-100 mx-auto h-60"><img src="${
            card?.thumbnail
          }" alt="" class=" h-full w-full rounded-lg" /></div>
          ${
            card.others?.posted_date !== undefined &&
            card.others?.posted_date !== ''
              ? `<div class="w-3/5 py-1 absolute bg-black text-white text-center right-2 bottom-2 rounded-sm">${
                  card.others.posted_date >= 3600
                    ? `${Math.floor(
                        card.others.posted_date / 3600
                      )}hrs ${Math.floor(
                        (card.others.posted_date % 3600) / 60
                      )}min ago`
                    : card.others.posted_date >= 60
                    ? `${Math.floor(card.others.posted_date / 60)}m `
                    : ''
                }</div>`
              : ''
          }
    </figure>
     <div class="card-footer flex justify-around mt-8">
          <div class="flex  gap-3">
            <div class="basis-1/4">
              <div>
                <div class="avatar">
                  <div class="w-3/4 rounded-full">
                    <img src="${card?.authors[0].profile_picture}" />
                  </div>
                </div>
              </div>
            </div>
            <div class="basis-3/4">
              <h6 class="text-lg font-semibold">${card.title}</h6>
              <div class="flex"><p class="text-sm">${
                card.authors[0].profile_name
              } 
              </p>
              <img src=" ${
                card.authors[0].verified ? `image/vary.svg` : ''
              }" alt="" /></div>
              <p class="text-sm">${card.others.views}</p>
              
            </div>
          </div>
        </div>
    `;
      const number = parseFloat(card.others.views);
      console.log(number);
      cardContainer.appendChild(cardItem);
      allCards.push(card);
      if (card.category === 'Music') {
        musicCards.push(card);
      }
      if (card.category === 'Comedy') {
        comedyCards.push(card);
      }
    });
    sortCards(allCards);
    sortCards(musicCards);
    sortCards(comedyCards);
  }
};
const sortCards = cardsArray => {
  cardsArray.sort((a, b) => {
    return parseFloat(b.card.others.views) - parseFloat(a.card.others.views);
  });
};

const handleShortByViews = () => {
  sortCards(allCards);
  sortCards(musicCards);
  sortCards(comedyCards);
};
const shortByViews = document.getElementById('short-by-views-button');
shortByViews.addEventListener('click', handleShortByViews);

const handleBlog = () => {
  window.location.href = 'blog.html';
};
handleCategory();
