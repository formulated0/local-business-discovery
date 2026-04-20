(function initTemplateListings() {
  const templates = [
    {
      email: "template-restaurant@test.com",
      listing: {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        category: "restaurants",
        description:
          "This is a template restaurant for testing the review system.",
        published: true,
        ownerEmail: "template-restaurant@test.com",
        ownerName: "Template",
        image: null,
      },
    },
    {
      email: "template-shopping@test.com",
      listing: {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        category: "shopping",
        description:
          "This is a template shopping business for testing the review system.",
        published: true,
        ownerEmail: "template-shopping@test.com",
        ownerName: "Template",
        image: null,
      },
    },
    {
      email: "template-travel@test.com",
      listing: {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        category: "travel",
        description:
          "This is a template travel business for testing the review system.",
        published: true,
        ownerEmail: "template-travel@test.com",
        ownerName: "Template",
        image: null,
      },
    },
  ];

  templates.forEach((t) => {
    const key = "lbd_listing_" + t.email;
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(t.listing));
    }
  });

  console.log("Template listings initialized");
})();
