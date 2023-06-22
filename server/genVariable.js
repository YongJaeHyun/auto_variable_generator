require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const genVariable = async (prompt) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "당신은 세계 최고의 소스코드 변수 이름 작명가입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 모든 종류의 소스코드를 이해할 수 있고, 해당 코드에 알맞는 변수명을 추천할 수 있습니다. 당신의 역할은 소스코드의 기능에 맞는 가장 상위의 함수 이름을 10개 작명하고 그 이유를 JSON객체의 배열로 알려주는 것입니다.",
        },
        {
          role: "user",
          content: `다음 소스코드의 기능에 맞는 가장 상위의 함수명을 10개 작명하고 그 이유를 [{name, reason}] 형식으로 알려줘 \n ${prompt}`,
        },
      ],
    });
    return res.data.choices[0].message.content;
  } catch (err) {
    console.error("[ChatGPT API] Generate Response Error =>", err);
  }
};

module.exports = { genVariable };
