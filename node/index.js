import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  //set author, genre and theme for the story here
    const author = 'Charles Dickens'
    const genre = 'adventure'
    const theme = 'high-stakes heist'
    generateStory(author, genre, theme);
}

async function generateStory(author, genre, theme) {
  //uses ChatGPT API to write a short story
  const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": `You are writing as ${author}. You must return your messages in JSON format.`
        },
        {
          "role": "user",
          "content": `Write a short ${genre} story (maximum 300 words) with the 
          following theme: ${theme}". Give the story a title.
          Give a JSON response formatted: {'title': <STORY TITLE HERE>, 'body': <STORY CONTENT HERE>}`
        }
      ],
      temperature: 1.5,
      max_tokens: 600,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
  });
  //output the story
  var story = response.choices[0].message.content;
  var JSONstory = JSON.parse(story);
  if (JSONstory){
    let storyTitle = JSONstory.title;
    let storyBody = JSONstory.body;
    console.log(storyTitle+"\n");
    console.log(storyBody);
  }
}

main();