export const WIX_API_DOCS = `BASE URL: https://www.wixapis.com/blog/v3/posts

API Documentation
The API endpoint /posts retrieves a list of published blog posts. The endpoint supports a variety of filters, sort orders, and pagination options. The response includes an array of posts and metadata about the list. Here are the parameters and response objects:

Parameter       Format                  Required    Default         Description
featured        Boolean                 No          false           Return only featured posts.
hashtags        Array<string>           No                          Pass an array of hashtags to filter the posts.
categoryIds     Array<string>           No                          Pass an array of category IDs to filter the posts.
tagIds          Array<string>           No                          Pass an array of tag IDs to filter the posts.
sort            String                  No          FEED            The order in which to sort the returned posts. Supported values: FEED, PUBLISHED_DATE_ASC, PUBLISHED_DATE_DESC, VIEW_COUNT, LIKE_COUNT, TITLE_ASC, TITLE_DESC, RATING.
paging.offset   Integer                 No          0               Number of items to skip in the current sort order.
paging.limit    Integer                 No          50              Number of items to return.
paging.cursor   String                  No                          Pointer to the next or previous page in the list of results.
fieldsToInclude Array<string> (DEPRECATED) No                      List of post fields to be included in the response. Deprecated. Use fieldsets instead. This parameter will be removed on June 30, 2023.
language        String                  No                          2-letter language code in ISO 639-1 alpha-2 format. Pass a language to only receive posts that are in that language.
memberId        String                  No                          Post owner's member ID.
fieldsets       Array<string>           No                          List of additional post fields to include in the response.

Response Object
Name            Type          Description
posts           Array<object> List of posts.
metaData        Object        Details on the paged set of results returned.

Authorization
This endpoint requires an authorization header - pass the access token from the OAuth installation flow.

Permissions
This endpoint requires the Read Blog permission scope.

Status/Error Codes
The response will include an HTTP status code.`;
