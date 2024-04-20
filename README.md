# 🤖 DecentraForm - Give Feedback, get rewarded. 

**A platform created during the SPARKLOOM Hackathon by MorphL2** designed for collecting and rewarding user feedback, with token/crypto incentives in exchange for constructive feedback, determined by AI.

Feedback is important, but collecting it in a meaningful, engaging way is a challenge, and mundane, with poor-quality insights and lots of wasted time. DecentraForm introduces a novel approach to incentivize and validate user feedback. By combining blockchain with AI analysis, only constructive feedback is rewarded, thereby encouraging quality contributions and genuine user engagement, instead of one-word answers and trolls.

This dapp is real-world practical and can offer real-world value to DApp developers and anyone else looking for genuine user feedback and to not have to wade through lots of low-quality feedback. It can be adapted and used by any platform or protocol and with any token as a reward, as you just add your own token address when deploying the contract. It can serve a wide range of applications, from DApp developers seeking user feedback to retail platforms interested in customer insights. 

👉 [Live demo](https://ai-feedback-rewards.vercel.app/)

For the best experience view on web, the application is currently not optimized for mobile devices.

## Features Summary

- **Decentralized Feedback Mechanism and Token Rewards**: Users receive immediate token/crypto incentives in return for their validated constructive feedback, fostering a culture of quality and engagement and making the feedback process rewarding and engaging.

- **AI-Powered Validation**: Feedback is analyzed by an AI model to determine its constructiveness before any rewards are distributed. It understands context, sentiment, and constructiveness, ensuring that rewards are given for genuinely helpful feedback.

- **Privacy-Preserving Proof of Interaction**: Utilizing Zero-Knowledge Proofs (ZKPs) to verify genuine user interaction without compromising privacy. Users prove their interaction without revealing unnecessary details.

- Harness insights of your community or customer base in a decentralized manner.
- Simple, straightforward, easy user experience, with all the heavy lifting happening on the backend out of sight. Submitting feedback is as seamless as possible, thereby enhancing the overall user experience.
- Easy model to apply to businesses, protocols. Directly contributing to creating everyday on-chain interactions that are engaging and valuable.

## How to Use

Please make sure you are connected to the **Morph testnet** in order to submit.

1. Qualify to feedback submission by clicking the 'qualify button' - this is simulating a real-world interaction for example testing out a function on an app.

2. Once qualified you will then be able to submit feedback, how about submitting some feedback about this dapp, make sure it's constructive feedback, or the AI overlords won't reward you. Press submit, and if it passes as constructive enough, you will be able to claim your reward by clicking the 'claim reward' button.

Your reward goes directly into your wallet.

That's it. Easy peasy.

## How It Works

1. **Verification**: Users prove their interaction with the product, feature, or service through ZKPs (currently simulated in the demo), ensuring feedback is based on genuine experiences.
This is currently done by passing a hash stored on the users local storage which is then passed to the smart contract as confirmation that they have completed the task that requires feedback. 

2. **Submission and Analysis**: Upon submitting feedback, the text is sent to an off-chain AI model for sentiment analysis to determine its constructiveness. Users receive immediate feedback on their submission's status. The model can be very easily fine tuned based on the importance of certain attributes that a business may want feedback about, for example bug reports weighted higher. 

3. **Reward Distribution**: Constructive feedback triggers a smart contract function on Morph, rewarding the user with tokens directly to their wallet.

## Highlights and Benefits

- **Quality Insights**: Encourages high-quality, constructive feedback from users or community members.
- **User Engagement**: Token rewards incentivize user participation and engagement.
- **Decentralization**: Leverages blockchain for transparency, security, and trust.
- **Adaptability**: Easily integrated and customized to fit various platforms and needs.

## AI Analysis

Parameters used by the model to calculate constructiveness are: { ['constructive criticism', 'feature request', 'bug report', 'general praise', 'suggestion for improvement', 'detailed feedback'] } - each are weighted based on testing.


## Core Concept for ZKproofs as Part of the Feedback Loop

1. **User Interaction**: Users interact with an app or service, triggering specific actions (e.g., completing a purchase, using a feature).

2. **Proof of Interaction**: For each type of interaction, the user generates a ZK proof that they performed the action without revealing their identity or the specifics of the action.

3. **Feedback Submission**: Users submit their feedback along with the ZK proof. The business can verify the proof to ensure the feedback is from a genuine interaction, but they do not know who the user is. This could encourage more honest feedback, and the AI is there to stop time wasters and grifters.