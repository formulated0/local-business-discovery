// this is actuall a pretty shitty implementation because it updates once and then caches itself so i cant even add more templates in the live server

(function initTemplateListings() {
  const templates = [
    {
      email: "template-restaurant1@test.com",
      listing: {
        name: "TEMPLATE 1",
        address: "TEMPLATE ADDR",
        category: "restaurants",
        description:
          "This is a template restaurant for testing the review system.",
        published: true,
        ownerEmail: "template-restaurant1@test.com",
        ownerName: "Template",
        image: null,
      },
    },
    {
      email: "template-restaurant2@test.com",
      listing: {
        name: "TEMPLATE 2",
        address: "TEMPLATE ADDR",
        category: "restaurants",
        description:
          "This is a template restaurant for testing the review system.",
        published: true,
        ownerEmail: "template-restaurant2@test.com",
        ownerName: "Template",
        image: null,
      },
    },
    {
      email: "template-restaurant3@test.com",
      listing: {
        name: "TEMPLATE 3",
        address: "TEMPLATE ADDR",
        category: "restaurants",
        description:
          "This is a template restaurant for testing the review system.",
        published: true,
        ownerEmail: "template-restaurant3@test.com",
        ownerName: "Template",
        image: null,
      },
    },
    {
      email: "template-shopping1@test.com",
      listing: {
        name: "TEMPLATE 1",
        address: "TEMPLATE ADDR",
        category: "shopping",
        description:
          "This is a template shopping business for testing the review system.",
        published: true,
        ownerEmail: "template-shopping1@test.com",
        ownerName: "Template",
        image: null,
      },
    },
    {
      email: "template-shopping2@test.com",
      listing: {
        name: "TEMPLATE 2",
        address: "TEMPLATE ADDR",
        category: "shopping",
        description:
          "This is a template shopping business for testing the review system.",
        published: true,
        ownerEmail: "template-shopping2@test.com",
        ownerName: "Template",
        image: null,
      },
    },
    {
      email: "template-shopping3@test.com",
      listing: {
        name: "TEMPLATE 3",
        address: "TEMPLATE ADDR",
        category: "shopping",
        description:
          "This is a template shopping business for testing the review system.",
        published: true,
        ownerEmail: "template-shopping3@test.com",
        ownerName: "Template",
        image: null,
      },
    },
    {
      email: "template-travel1@test.com",
      listing: {
        name: "TEMPLATE 1",
        address: "TEMPLATE ADDR",
        category: "travel",
        description:
          "This is a template travel business for testing the review system.",
        published: true,
        ownerEmail: "template-travel1@test.com",
        ownerName: "Template",
        image: null,
      },
    },
    {
      email: "template-travel2@test.com",
      listing: {
        name: "TEMPLATE 2",
        address: "TEMPLATE ADDR",
        category: "travel",
        description:
          "This is a template travel business for testing the review system.",
        published: true,
        ownerEmail: "template-travel2@test.com",
        ownerName: "Template",
        image: null,
      },
    },
    {
      email: "template-travel3@test.com",
      listing: {
        name: "TEMPLATE 3",
        address: "TEMPLATE ADDR",
        category: "travel",
        description:
          "This is a template travel business for testing the review system.",
        published: true,
        ownerEmail: "template-travel3@test.com",
        ownerName: "Template",
        image: null,
      },
    },
  ];

  templates.forEach((t) => {
    const key = "lbd_listing_" + t.email;
    localStorage.setItem(key, JSON.stringify(t.listing));
  });

  // template reviews with varied ratings so that it works in the filtering/sorting
  const reviews = [
    // restaurants
    {
      email: "template-restaurant1@test.com",
      templateReviews: [
        {
          rating: 5,
          authorName: "RESTAURANT REVIEWER",
          text: "TEMPLATE REVIEW",
          date: "1/05/26",
        },
        {
          rating: 4,
          authorName: "RESTAURANT REVIEWER",
          text: "TEMPLATE REVIEW",
          date: "1/05/26",
        },
      ],
    },
    {
      email: "template-restaurant2@test.com",
      templateReviews: [
        {
          rating: 2,
          authorName: "RESTAURANT REVIEWER",
          text: "TEMPLATE REVIEW",
          date: "1/05/26",
        },
        {
          rating: 3,
          authorName: "RESTAURANT REVIEWER",
          text: "TEMPLATE REVIEW",
          date: "1/05/26",
        },
      ],
    },
    {
      email: "template-restaurant3@test.com",
      templateReviews: [
        {
          rating: 4,
          authorName: "RESTAURANT REVIEWER",
          text: "TEMPLATE REVIEW",
          date: "1/05/26",
        },
        {
          rating: 4,
          authorName: "RESTAURANT REVIEWER",
          text: "TEMPLATE REVIEW",
          date: "1/05/26",
        },
      ],
    },

    // shopping
    {
      email: "template-shopping1@test.com",
      templateReviews: [
        {
          rating: 5,
          authorName: "SHOPPING REVIEWER",
          text: "TEMPLATE REVIEW",
          date: "1/05/26",
        },
        {
          rating: 5,
          authorName: "SHOPPING REVIEWER",
          text: "TEMPLATE REVIEW",
          date: "1/05/26",
        },
      ],
    },
    {
      email: "template-shopping2@test.com",
      templateReviews: [
        {
          rating: 3,
          authorName: "SHOPPING REVIEWER",
          text: "TEMPLATE REVIEW",
          date: "1/05/26",
        },
        {
          rating: 3,
          authorName: "SHOPPING REVIEWER",
          text: "TEMPLATE REVIEW",
          date: "1/05/26",
        },
      ],
    },
    {
      email: "template-shopping3@test.com",
      templateReviews: [
        {
          rating: 4,
          authorName: "SHOPPING REVIEWER",
          text: "TEMPLATE REVIEW",
          date: "1/05/26",
        },
        {
          rating: 5,
          authorName: "SHOPPING REVIEWER",
          text: "TEMPLATE REVIEW",
          date: "1/05/26",
        },
      ],
    },

    // travel
    {
      email: "template-travel1@test.com",
      templateReviews: [
        {
          rating: 2,
          authorName: "TRAVEL REVIEWER",
          text: "TEMPLATE REVIEW",
          date: "1/05/26",
        },
        {
          rating: 2,
          authorName: "TRAVEL REVIEWER",
          text: "TEMPLATE REVIEW",
          date: "1/05/26",
        },
      ],
    },
    {
      email: "template-travel2@test.com",
      templateReviews: [
        {
          rating: 4,
          authorName: "TRAVEL REVIEWER",
          text: "TEMPLATE REVIEW",
          date: "1/05/26",
        },
        {
          rating: 3,
          authorName: "TRAVEL REVIEWER",
          text: "TEMPLATE REVIEW",
          date: "1/05/26",
        },
      ],
    },
    {
      email: "template-travel3@test.com",
      templateReviews: [
        {
          rating: 5,
          authorName: "TRAVEL REVIEWER",
          text: "TEMPLATE REVIEW",
          date: "1/05/26",
        },
        {
          rating: 4,
          authorName: "TRAVEL REVIEWER",
          text: "TEMPLATE REVIEW",
          date: "1/05/26",
        },
      ],
    },
  ];

  reviews.forEach((item) => {
    const key = "lbd_reviews_" + item.email;
    localStorage.setItem(key, JSON.stringify(item.templateReviews));
  });
})();
