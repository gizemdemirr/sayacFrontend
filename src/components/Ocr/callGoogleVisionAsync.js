const API_KEY = 'AIzaSyBC6CNP0ypZONbH8JbF-QT26gBHPtcCMkw';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

function generateBody(image) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: 'TEXT_DETECTION',
            maxResults: 1,
          },
        ],
      },
    ],
  };
  return body;
}
async function callGoogleVisionAsync(image) {
  const body = generateBody(image);
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();

  const filters = result.responses[0].textAnnotations.filter(object => {
    // console.log('object.description',object.description);
    // console.log('object.description.match',object.description.match('^[0-9]{5}'));
    return object.description.match('^[0-9]{5}');
  });
  console.log('filter', filters);

  // const index = result.responses[0].textAnnotations.findIndex(object => {
  //   return object.description === 'm³';
  // });
  //   const Endeks = result.responses[0].textAnnotations[index - 1].description;
  //   const detectedText = result.responses[0].fullTextAnnotation;
  //   if (Endeks.length === 5 ){
  //     console.warn(Endeks);
  //   }

  return filters[0].description
    ? filters[0].description
    : {text: "This image doesn't contain any text!"};
}

export default callGoogleVisionAsync;
