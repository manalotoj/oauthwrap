<a name="module_oauth-wrap"></a>
## oauth-wrap
Provides a function to retrieve OAuth WRAP security tokens.

<a name="module_oauth-wrap.getAuthHeader"></a>
### oauth-wrap.getAuthHeader(url, uid, pwd, scope) ⇒ <code>function</code>
Get an OAuth WRAP header value from an STS.

**Kind**: static method of <code>[oauth-wrap](#module_oauth-wrap)</code>  
**Returns**: <code>function</code> - A promise.

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | STS url. |
| uid | <code>string</code> | WRAP name/username/user id. |
| pwd | <code>string</code> | WRAP password. |
| scope | <code>string</code> | WRAP scope. |
