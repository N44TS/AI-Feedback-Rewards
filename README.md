# DecentraForm - Give Feedback, get rewarded. 

Feedback is important, but collecting it in a meaningful, engaging way is a challenge, and mundane, with poor-quality insights and lots of wasted time. DecentraForm introduces a novel approach to incentivize and validate user feedback. By combining blockchain with AI analysis, only constructive feedback is rewarded, thereby encouraging quality contributions and genuine user engagement, instead of one-word answers and trolls. It's designed for collecting and rewarding user feedback, with token/crypto incentives in exchange for constructive feedback, determined by AI.

This dapp is real-world practical and can offer real-world value to DApp developers and anyone else looking for genuine user feedback and to not have to wade through lots of low-quality feedback. It can be adapted and used by any platform or protocol and with any token as a reward, as you just add your own token address when deploying the contract. It can serve a wide range of applications, from DApp developers seeking user feedback to retail platforms interested in customer insights. Directly contributing to creating everyday on-chain interactions that are engaging and valuable.

## Live Demo

👉 [Live demo](https://ai-feedback-rewards.vercel.app/)

For the best experience view on web, the application is currently not optimized for mobile devices.

## Features Summary

- **Decentralized Feedback Mechanism and Token Rewards**: Users receive immediate token/crypto incentives in return for their validated constructive feedback, fostering a culture of quality and engagement and making the feedback process rewarding and engaging.

- **AI-Powered Validation**: Feedback is analyzed by an AI model to determine its constructiveness before any rewards are distributed. It understands context, sentiment, and constructiveness, ensuring that rewards are given for genuinely helpful feedback.

- **Privacy-Preserving Proof of Interaction**: Utilizing Zero-Knowledge Proofs (ZKPs) to verify genuine user interaction without compromising privacy. Users prove their interaction without revealing unnecessary details.

- Harness insights of your community or customer base in a decentralized manner.
- Simple, straightforward, easy user experience, with all the heavy lifting happening on the backend out of sight. Submitting feedback is as seamless as possible, thereby enhancing the overall user experience.
- Easy model to apply to businesses, protocols.

## How to Use

1. **Qualify to feedback submission** by clicking the 'qualify button' - this is simulating a real-world interaction for example testing out a function on an app.

2. Once qualified you will then be able to submit feedback, how about submitting some feedback about this dapp, make sure it's constructive feedback, or the AI overlords won't reward you. Press submit, and if it passes as constructive enough, you will be able to claim your reward by clicking the 'claim reward' button.

Your reward goes directly into your wallet.

That's it. Easy peasy.

## How It Works

1. **Verification**: Users prove their interaction with the product, feature, or service through ZKPs (currently simulated in the demo), ensuring feedback is based on genuine experiences.

2. **Submission and Analysis**: Upon submitting feedback, the text is sent to an off-chain AI model for sentiment analysis to determine its constructiveness. Users receive immediate feedback on their submission's status.

3. **Reward Distribution**: Constructive feedback triggers a smart contract function on Morph, rewarding the user with tokens directly to their wallet.

## Highlights and Benefits

- **Quality Insights**: Encourages high-quality, constructive feedback from users or community members.
- **User Engagement**: Token rewards incentivize user participation and engagement.
- **Decentralization**: Leverages blockchain for transparency, security, and trust.
- **Adaptability**: Easily integrated and customized to fit various platforms and needs.

## Core Concept for ZKproofs as Part of the Feedback Loop

1. **User Interaction**: Users interact with an app or service, triggering specific actions (e.g., completing a purchase, using a feature).

2. **Proof of Interaction**: For each type of interaction, the user generates a ZK proof that they performed the action without revealing their identity or the specifics of the action.

3. **Feedback Submission**: Users submit their feedback along with the ZK proof. The business can verify the proof to ensure the feedback is from a genuine interaction, but they do not know who the user is. This could encourage more honest feedback, and the AI is there to stop time wasters and grifters.

## AI Analysis Extra

Parameters used by the model to calculate constructiveness are: { ['constructive criticism', 'feature request', 'bug report', 'general praise', 'suggestion for improvement', 'detailed feedback'] } - each are weighted based on testing.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
