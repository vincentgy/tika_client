const URL = 'http://18.222.175.208';

export const Post = async body => {
  const res = await fetch(URL, {
    method: 'POST',
    body: JSON.stringify({param: body}),
    headers: {
      'Content-Type': 'application/x-www-form-urlencode',
    },
  });

  const json = await res.json();
  return json;
};
