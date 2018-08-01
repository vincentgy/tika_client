Tika RESTFUL API list

Error Code,
-1 invalid command;
-2 invalid parameters;

---

1.user login,

Request,
‘a’:'ul',
‘e’:email,
’p’:password, password should be hashed by md5.

Response,
JSON object with `ret`,
‘ret’, 0 means successful, otherwise failed.

---

2.  user register,

Request,
'a':'ur',
'e': email,
'p': password, password should be hashed by md5.
'n': name

Response,
JSON object with `ret`,
‘ret’, 0 means successful, otherwise failed.

---

3.  Job categories,

Request,
'a':'jc'

Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
‘data’, JSON encoded array of job categories, with [id, name], `[{\"id\":\"1\",\"name\":\"Accounting\"}...]`

---

4.  Job types,

Request,
'a':'jt'

Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
‘data’, JSON encoded array of job categories, with [id, name]

    +----+-----------+
    | id | name      |
    +----+-----------+
    |  1 | full-time |
    |  2 | contract  |
    |  3 | part-time |
    |  4 | one-off   |
    +----+-----------+

---

5.  Job pay types,
    Request,
    'a':'jpt'

Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
‘data’, JSON encoded array of job categories, with [id, name]

    +----+---------+
    | id | name    |
    +----+---------+
    |  1 | one-off |
    |  2 | annual  |
    |  3 | hourly  |
    +----+---------+

---

6.  List regions,

Request,
'a':'lr'

Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
‘data’, JSON encoded array of job categories, with [id, name]

    +----+---------------------+--------------+
    | id | name                | country_code |
    +----+---------------------+--------------+
    |  1 | Auckland            | NZ           |
    |  2 | Bay Of Plenty       | NZ           |
    |  3 | Canterbury          | NZ           |
    |  4 | Gisborne            | NZ           |
    |  5 | Hawke's Bay         | NZ           |
    |  6 | Manawatu / Wanganui | NZ           |
    |  7 | Marlborough         | NZ           |
    |  8 | Nelson / Tasman     | NZ           |
    |  9 | Northland           | NZ           |
    | 10 | Otago               | NZ           |
    | 11 | Southland           | NZ           |
    | 12 | Taranaki            | NZ           |
    | 13 | Waikato             | NZ           |
    | 14 | Wellington          | NZ           |
    | 15 | West Coast          | NZ           |
    +----+---------------------+--------------+

---

7.  List districts by region id,

```
Request,
'a':'ld'
‘r’: region id

Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
‘data’, JSON encoded array of job categories, with [id, name]
```

---

8.Post Job,

```bash
Request,
‘a’:'pj',
‘title’ : job title,
‘company’ : company name,
‘description’ : job description,
’user_id’ : user id of creator,
‘type’ : job type id,
‘pay_type’ : pay type id,
‘minimum_pay’ : minimum salary,
‘maximum_pay’ : maximum salary,
‘region_id’ : region id,
‘district_id’ : district id,
‘location’ : detailed address,
‘number’ : number of employees required,
‘categories’ : list of categories the job belongs.

Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
```

---

9.Search Job,

```bash
Request,
‘a’:'sj',
'query' =>[
    ‘title’ : job title key word,
    ‘company’ : company name key word,
    ‘description’ : job description key word,
    ‘type’ : job type id,
    ‘pay_type’ : pay type id,
    ‘minimum_pay’ : minimum salary,
    ‘maximum_pay’ : maximum salary,
    ‘region_id’ : region id,
    ‘district_id’ : district id,
    ‘location’ : address key word,
    ‘category_ids’ : list of categories the job belongs.
]

Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
‘data’, JSON encoded array of job list.
```
