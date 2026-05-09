import Image from "next/image";

export default function Section1() {
  return (
    <>
      {/* About section 1 */}
      <section className="sec-1-about sec-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="ds-2 mb-0">About Top Headlines News</h2>
              <p className="fs-56 m-0">
                Top Headlines News एक डिजिटल न्यूज़ पोर्टल है जिसका उद्देश्य
                देश-दुनिया की महत्वपूर्ण खबरों को तेज़, सटीक और विश्वसनीय तरीके
                से पाठकों तक पहुँचाना है। हम अपने पाठकों को राजनीति, राष्ट्रीय
                समाचार, अंतरराष्ट्रीय घटनाओं, व्यापार, तकनीक, खेल, मनोरंजन और
                सामाजिक मुद्दों से जुड़ी ताज़ा जानकारी प्रदान करते हैं। हमारी
                कोशिश है कि हर खबर निष्पक्षता, विश्वसनीयता और जिम्मेदार
                पत्रकारिता के सिद्धांतों के साथ प्रकाशित की जाए। Top Headlines
                News का लक्ष्य केवल खबर देना ही नहीं, बल्कि पाठकों को सही और
                प्रमाणित जानकारी उपलब्ध कराना भी है ताकि वे देश और समाज में हो
                रही घटनाओं से जागरूक रह सकें। हमारी टीम लगातार विश्वसनीय स्रोतों
                से जानकारी एकत्रित कर उसे सरल और स्पष्ट भाषा में पाठकों तक
                पहुँचाने का प्रयास करती है। डिजिटल मीडिया के इस दौर में हमारा
                उद्देश्य है कि हर महत्वपूर्ण खबर आपके मोबाइल, लैपटॉप या किसी भी
                डिवाइस पर तुरंत उपलब्ध हो।
              </p>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-12 py-5">
              <Image
                className="rounded-8 overflow-hidden cover-image"
                src="/assets/imgs/page/img-117.png"
                alt="magzin"
                width={1194}
                height={576}
              />
            </div>
          </div> */}
          <div className="row g-4">
            <div className="col-lg-6 pe-lg-5">
              <h5 className="mb-4">हमारा उद्देश्य – Top Headlines News</h5>
              <ul className="list-unstyled m-0 p-0">
                <li className="d-flex gap-3">
                  {/* <p className="fw-semi-bold mt-0 text-dark w-25">
                    Curated Content
                  </p> */}
                  <p className="w-75 mt-0">
                    ताज़ा और विश्वसनीय समाचार प्रदान करना
                  </p>
                </li>
                <li className="d-flex gap-3">
                  {/* <p className="fw-semi-bold mt-0 text-dark w-25">
                    Expert Insights
                  </p> */}
                  <p className="w-75 mt-0">
                    निष्पक्ष और जिम्मेदार पत्रकारिता को बढ़ावा देना
                  </p>
                </li>
                <li className="d-flex gap-3">
                  {/* <p className="fw-semi-bold mt-0 text-dark w-25">Community</p> */}
                  <p className="w-75 mt-0">
                    समाज से जुड़े महत्वपूर्ण मुद्दों को सामने लाना
                  </p>
                </li>
                <li className="d-flex gap-3">
                  {/* <p className="fw-semi-bold mt-0 text-dark w-25">Community</p> */}
                  <p className="w-75 mt-0">
                    पाठकों को सही और प्रमाणित जानकारी देना
                  </p>
                </li>
              </ul>
            </div>

            <div className="col-lg-6">
              <h5 className="mb-4">हमारी विशेषताएँ</h5>
              <ul className="list-unstyled m-0 p-0">
                <li className="d-flex gap-3">
                  {/* <p className="fw-semi-bold mt-0 text-dark w-25">
                    Inspiration
                  </p> */}
                  <p className="w-75 mt-0">ब्रेकिंग न्यूज़ और लेटेस्ट अपडेट</p>
                </li>
                <li className="d-flex gap-3">
                  {/* <p className="fw-semi-bold mt-0 text-dark w-25">
                    Authenticity
                  </p> */}
                  <p className="w-75 mt-0">
                    राजनीति, व्यापार, टेक्नोलॉजी, खेल और मनोरंजन की खबरें
                  </p>
                </li>
                <li className="d-flex gap-3">
                  {/* <p className="fw-semi-bold mt-0 text-dark w-25">Creativity</p> */}
                  <p className="w-75 mt-0">सरल और स्पष्ट भाषा में समाचार</p>
                </li>
                <li className="d-flex gap-3">
                  {/* <p className="fw-semi-bold mt-0 text-dark w-25">Creativity</p> */}
                  <p className="w-75 mt-0">
                    डिजिटल प्लेटफॉर्म पर तेज़ और भरोसेमंद जानकारी
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
