const phrases = [ 
    "🔥 Infor Hiếu Nèk, => [Bio HieuDz](https://nguoibian.vercel.app/)!",
    "🤍 Made by [Hiếu Dz](https://www.facebook.com/KingHieuDzPro747/).",
    "☄️ Click Here Pls => =) [Bio Tui](https://nguoibian.vercel.app/).",
    "🌟 Like Facebook ik! [Fb tao](https://www.facebook.com/KingHieuDzPro747/)!",
    "🦢 Cảm on vì dùng nhoa, dùng nhiều qs coi chừng mất gốc toán đó,Cân all bài tập! ;)",
];

const originalFetch = window.fetch;

window.fetch = async function (input, init) {
    let body;
    if (input instanceof Request) body = await input.clone().text();
    else if (init && init.body) body = init.body;

    const originalResponse = await originalFetch.apply(this, arguments);
    const clonedResponse = originalResponse.clone();

    try {
        const responseBody = await clonedResponse.text();
        let responseObj = JSON.parse(responseBody);
        if (features.questionSpoof && responseObj?.data?.assessmentItem?.item?.itemData) {
            let itemData = JSON.parse(responseObj.data.assessmentItem.item.itemData);
            if(itemData.question.content[0] === itemData.question.content[0].toUpperCase()){
                itemData.answerArea = { "calculator": false, "chi2Table": false, "periodicTable": false, "tTable": false, "zTable": false }
                itemData.question.content = phrases[Math.floor(Math.random() * phrases.length)] + `[[☃ radio 1]]`;
                itemData.question.widgets = { "radio 1": { type: "radio",  options: { choices: [ { content: "Hiếu nói đáp án này đúng ây.", correct: true }, { content: "Đáp án này sai nha bro.", correct: false } ] } } };
                responseObj.data.assessmentItem.item.itemData = JSON.stringify(itemData);
                sendToast("🔓Câu Hỏi Đã Bị Tui Hack Hahaha.", 1000);
                return new Response(JSON.stringify(responseObj), { status: originalResponse.status, statusText: originalResponse.statusText, headers: originalResponse.headers });
            }
        }
    } catch (e) { debug(`🚨 Error @ questionSpoof.js\n${e}`); }
    return originalResponse;
};
