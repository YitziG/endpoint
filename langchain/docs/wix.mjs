// export const WIX_API_DOCS = `API Documentation
//
// 1. Query Contacts Endpoint:
// BASE URL: https://www.wixapis.com/contacts/v4/contacts/query
// The API endpoint /contacts/query retrieves a list of contacts, given the provided paging, filtering, and sorting. Up to 1,000 contacts can be returned per request. For a detailed list of supported operations, see filtering and sorting for contact properties, extended fields, and custom fields.
//
// Parameters:
// search: string (Optional, plain text search for an exact match, Max: 100 characters)
// query: object (Optional, Query options)
// filter: object (Optional, Filter object)
// sort: Array<object> (Optional, Sorting options)
// fieldName: string (Optional, Field to sort by)
// order: string (Optional, Default: "ASC", Sort order)
// paging.limit: integer (Optional, Default: 50, Number of items to return, Maximum: 1000)
// paging.offset: integer (Optional, Number of items to skip in the current sort order)
// fields: Array<string> (Optional, List of projected fields to return)
// fieldsets: Array<string> (Optional, Default: "FULL", Predefined sets of fields to return)
//
// Response Object:
// contacts: Array<object> (List of contacts)
// pagingMetadata: Object (Details on the paged set of results returned)
//
// Status/Error Codes:
// The response will include an HTTP status code.
//
// 2. Blog Posts Endpoint:
// BASE URL: https://www.wixapis.com/blog/v3/posts
// The API endpoint /posts retrieves a list of published blog posts. The endpoint supports a variety of filters, sort orders, and pagination options.
//
// Parameters:
// featured: Boolean (Optional, Default: false, Return only featured posts)
// hashtags: Array<string> (Optional, Pass an array of hashtags to filter the posts)
// categoryIds: Array<string> (Optional, Pass an array of category IDs to filter the posts)
// tagIds: Array<string> (Optional, Pass an array of tag IDs to filter the posts)
// sort: String (Optional, Default: "FEED", The order in which to sort the returned posts)
// paging.offset: Integer (Optional, Default: 0, Number of items to skip in the current sort order)
// paging.limit: Integer (Optional, Default: 50, Number of items to return)
// paging.cursor: String (Optional, Pointer to the next or previous page in the list of results)
// fieldsToInclude: Array<string> (DEPRECATED, Optional, List of post fields to be included in the response)
// language: String (Optional, 2-letter language code in ISO 639-1 alpha-2 format)
// memberId: String (Optional, Post owner's member ID)
// fieldsets: Array<string> (Optional, List of additional post fields to include in the response)
//
// Example Request:
//
// curl -X POST \\
//   'https://www.wixapis.com/contacts/v4/contacts/query' \\
//   -H 'Content-Type: application/json' \\
//   -H 'Authorization: <AUTH>' \\
//   --data-binary '{
//     "query": {
//       "filter": {
//         "info.name.last": "Smith"
//       },
//       "fieldsets": ["BASIC"]
//     }
//   }'
//
// Response Object:
// posts: Array<object> (List of posts)
// metaData: Object (Details on the paged set of results returned)
//
// Status/Error Codes:
// The response will include an HTTP status code.
// `;
export const WIX_API_DOCS = `
# List Contacts

Retrieves a list of contacts, given the provided paging, filtering, and sorting. Up to 1,000 contacts can be returned per request.

For a detailed list of supported operations, see filtering and sorting for contact properties, extended fields, and custom fields. To learn how to query contacts, see API Query Language.

**Endpoint**: \`POST https://www.wixapis.com/contacts/v4/contacts\`

## Request Parameters

| Name           | Type  | Description                                                                                                                                             |
|----------------|-------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| search         | string | Plain text search for an exact match. Supports properties: info.name.first, info.name.last, info.emails.email, info.phones.phone. Max: 100 characters |
| query          | object | Query options.                                                                                                                                          |

## Response Object

| Name           | Type          | Description                                                                     |
|----------------|---------------|---------------------------------------------------------------------------------|
| contacts       | Array<object> | List of contacts.                                                               |
| pagingMetadata | object        | Details on the paged set of results returned.                                   |

## Example
**Request**
\`\`\`sh
  curl -X GET \\
  'https://www.wixapis.com/contacts/v4/contacts?fieldsets=FULL' \\
  -H 'Authorization: <AUTH>'
  
\`\`\`
**Response**
\`\`\`json
{
  "contacts":   [
        {
      "id": "8046df3c-7575-4098-a5ab-c91ad8f33c47",
      "revision": 1,
      "primaryInfo":       {
        "email": "email@example.com",
        "phone": "097495550"
      },
      "info": {"name":       {
        "first": "John",
        "last": "Smith"
      }}
    },
        {
      "id": "e50c4534-d0a5-11ea-87d0-0242ac130003",
      "revision": 1,
      "primaryInfo":       {
        "email": "email211@example.com",
        "phone": "097499991"
      },
      "info": {"name":       {
        "first": "Jane",
        "last": "Smith"
      }}
      }
  ],
  "pagingMetadata":   {
    "count": 2,
    "offset": 0,
    "total": 2
  }
} 
\`\`\`

# Retrieve Blog Posts

The API endpoint \`/posts\` retrieves a list of published blog posts. The endpoint supports a variety of filters, sort orders, and pagination options. The response includes an array of posts and metadata about the list.

**Endpoint**: \`GET https://www.wixapis.com/blog/v3/posts\`

## Request Parameters

| Parameter       | Type         | Required | Default | Description                                                       |
|-----------------|--------------|----------|---------|-------------------------------------------------------------------|
| featured        | Boolean      | No       | false   | Return only featured posts.                                       |
| hashtags        | Array<string>| No       |         | Pass an array of hashtags to filter the posts.                    |
| categoryIds     | Array<string>| No       |         | Pass an array of category IDs to filter the posts.                |
| tagIds          | Array<string>| No       |         | Pass an array of tag IDs to filter the posts.                     |
| sort            | String       | No       | FEED    | Supported values: FEED, PUBLISHED_DATE_ASC, PUBLISHED_DATE_DESC, VIEW_COUNT, LIKE_COUNT, TITLE_ASC, TITLE_DESC, RATING. |

## Response Object

| Name      | Type          | Description                           |
|-----------|---------------|---------------------------------------|
| posts     | Array<object> | List of posts.                        |
| metaData  | Object        | Details on the paged set of results returned. |

## Status/Error Codes

The response will include an HTTP status code.
`;