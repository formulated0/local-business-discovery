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
})();
