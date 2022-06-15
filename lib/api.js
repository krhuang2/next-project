async function fetchGraphQL(query, preview = false) {
    return fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            preview
              ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
              : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
        },
        body: JSON.stringify({ query }),
      }
    ).then((response) => response.json())
  }

  export async function getHomePage(preview) {
    const pageData = await fetchGraphQL(
      `query {
        pageCollection(where: {title: "Home Page"}, preview: ${preview ? 'true' : 'false'}) {
          items {
            ${PAGE_GRAPHQL_FIELDS}
          }
        }
      }`,
      preview
    )
    return pageData?.data?.pageCollection?.items?.[0];
  }

  const PAGE_GRAPHQL_FIELDS = `
  title
  headingText
  `