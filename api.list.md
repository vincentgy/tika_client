Tika RESTFUL API list

Error Code,
-1 invalid command;
-2 invalid parameters;

---

1.user login,

Request,

```
‘a’:'ul',
‘e’:email,
’p’:password, password should be hashed by md5.
```

Response,

JSON object with `ret`,

```
‘ret’, 0 means successful, otherwise failed.
```

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
'a':'jc',
‘token’ : user token,

Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
‘data’, JSON encoded array of job categories, with [id, name], `[{\"id\":\"1\",\"name\":\"Accounting\"}...]`

---

4.  Job types,

Request,
'a':'jt',
‘token’ : user token,

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
    'a':'jpt',
    ‘token’ : user token,

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
'a':'lr',
‘token’ : user token

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
‘r’: region id,
‘token’ : user token

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
’token’ : user token,
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
    ‘district_ids’ : list of districts the jobs are in.
    ‘distance’ : distance in meters from the current location.
    ‘location’ : address key word,
    ‘category_ids’ : list of categories the job belongs.
],
'location' =>[
    ‘latitude’: latitude of current location,
    ‘longitude’: ‘longitude’ of current location
],
‘token’ : user token

Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
‘data’, JSON encoded array of job list.
```

---

10.Add profile,

```bash
Request,
‘a’:'up', update profile
‘token’ : user token,
‘description’ : self description,
‘phone’ : phohe number,
‘skills’ : skill tags, like plumper, electrician xxx,
‘qualifications’ => [
    ‘degree’ : degree,
    ‘school’ : school name,
    ‘major’ : major,
    ‘start’ : start yearmonth, like 201008,
    ‘end’ : start yearmonth, like 201208,
],
‘experiences’ => [
    ‘place’ : company name or other location names,
    ‘title’ : job title of work,
    ‘task’ : work content,
    ‘start’ : start yearmonth, like 201008,
    ‘end’ : start yearmonth, like 201208,
]

Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
```

---

11.Get profile,

```bash
Request,
‘a’:'gp', update profile
‘user_id’ : user id

Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
‘data’, JSON encoded user profile.
```

---

12.Update a certain qualification,

```bash
Request,
‘a’:'uq', update qualification
‘id’ : qualification id,
‘degree’ : degree,
‘school’ : school name,
‘major’ : major,
‘start’ : start yearmonth, like 201008,
‘end’ : start yearmonth, like 201208,
‘token’ : user token

Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
```

---

13.Update a certain work experience,

```bash
Request,
‘a’:'ue', update experience
‘id’ : work experience id,
‘place’ : company name or other location names,
‘title’ : job title of work,
‘task’ : work content,
‘start’ : start yearmonth, like 201008,
‘end’ : start yearmonth, like 201208,
‘token’ : user token

Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
```

---

14.Apply a position

```bash
Request,
‘a’:'ap', apply position
‘p’ : position id,
‘token’ : user token

Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
```

---

15.Get application list

```bash
Request,
‘a’:'gal', get application list,
‘p’ : position id,

Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
‘data’, JSON encoded application list.
```

---

16.Upload Avatar

```bash
Request,
http://18.222.175.208/upload.php?token=xxx&c=u&id=3

token:
client token

c:
'u': user
'p': position
'c': company

id:
id of the object, and it is user, then no id is needed.

Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
‘url’, url of the avatar stored on Amazon s3.


example:

<!DOCTYPE html>
<html>
<body>
  <!--This example can be used for testing the upload script-->
  <form action="http://18.222.175.208/upload.php?token=xxxc=u&id=3" method="post" enctype="multipart/form-data">
    <input type="file" name="fileToUpload"><br>
    <input type="submit" value="Upload">
  </form>

</body>
</html>
```

---

17.Get Posted Job List

```bash
Request,
‘a’:'gpl', get posted job list,
‘user_id’ : [optional]user id,
‘token’ : user token,

if ‘user_id’ is not specified, then it will return the job list posted by user himself, fetched from ‘token’.
Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
‘data’, JSON encoded job list.
```

---

18.Delete a certain work experience,

```bash
Request,
‘a’:'de', delete experience
‘id’ : work experience id,
‘token’ : user token

Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
```

---

19.Delete a certain qualification,

```bash
Request,
‘a’:'dq', delete qualification
‘id’ : qualification id,
‘token’ : user token

Response,
JSON object,
‘ret’, 0 means successful, otherwise failed.
```
