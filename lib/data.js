import got from "got";
import { convert } from "html-to-text";

const dataURL =
  "https://dev-cs5513-week11-petrutababei.pantheonsite.io/wp-json/twentytwentythree-child/v1/latest-posts/1";

const contactDataUrl =
  "https://dev-cs5513-week11-petrutababei.pantheonsite.io/wp-json/twentytwentythree-child/v1/contacts";

async function getData(url) {
  let jsonString;
  try {
    jsonString = await got(url);
  } catch (error) {
    jsonString.body = [];
    console.log(error);
  }
  const jsonObj = JSON.parse(jsonString.body);
  return jsonObj;
}

export async function getAllIds() {
  const jsonObj = await getData(dataURL);

  return jsonObj.map(function (item) {
    return {
      params: { id: item.ID.toString() },
    };
  });
}

export async function getSortedList() {
  const jsonObj = await getData(dataURL);

  jsonObj.sort(function (a, b) {
    return a.post_title.localeCompare(b.post_title);
  });
  return jsonObj.map(function (item) {
    return {
      id: item.ID.toString(),
      title: item.post_title,
      author: item.post_author,
      content: convert(item.post_content),
    };
  });
}

export async function getItemData(idRequested) {
  const jsonObj = await getData(dataURL);

  const objMatch = jsonObj.filter((obj) => {
    return obj.ID.toString() === idRequested;
  });

  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }
  return {
    id: objReturned.ID,
    title: objReturned.post_title,
    author: objReturned.post_author,
    content: convert(objReturned.post_content),
  };
}

export async function getContactIds() {
  const jsonObj = await getData(contactDataUrl);

  return jsonObj.map(function (item) {
    return {
      params: { id: item.ID.toString() },
    };
  });
}

export async function getSortedContactList() {
  const jsonObj = await getData(contactDataUrl);

  jsonObj.sort(function (a, b) {
    return a.post_title.localeCompare(b.post_title);
  });

  return jsonObj.map(function (item) {
    return {
      id: item.ID.toString(),
      title: item.post_title,
      contact_data: {
        first_name: item.acf_fields.first_name,
        last_name: item.acf_fields.first_name,
        email: item.acf_fields.email,
      },
    };
  });
}

export async function getContactData(idRequested) {
  const jsonObj = await getData(contactDataUrl);

  const objMatch = jsonObj.filter((obj) => {
    return obj.ID.toString() === idRequested;
  });

  let objReturned;

  if (objMatch.length > 0) {
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }

  return {
    id: objReturned.ID.toString(),
    title: objReturned.post_title,
    contact_data: {
      first_name: objReturned.acf_fields.first_name,
      last_name: objReturned.acf_fields.last_name,
      email: objReturned.acf_fields.email,
    },
  };
}
