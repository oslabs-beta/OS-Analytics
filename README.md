
<p align="center">
    <img src="client\src\assets\icons\S Analytics copy.png" alt="Pie Chart Icon"/>
</p>

# OS Analytics

**OS Analytics** is a powerful and easy-to-use tool designed to monitor user interactions on websites. By integrating a custom `clickTracker` hook, developers can capture and visualize user activity data in real-time. This data helps developers better understand user behavior, optimize their apps, and make informed decisions based on analytics. With a robust dashboard that filters and exports data, you can track, manage, and visualize user interactions effectively.

## 🛠️ Tech Stack

<div align='center'>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![AWS](https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![React Flow](https://img.shields.io/badge/ReactFlow-0077b5?style=for-the-badge&logo=reactflow&logoColor=white)
![AWS Bedrock](https://img.shields.io/badge/AWS%20Bedrock-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![AWS Cognito](https://img.shields.io/badge/AWS%20Cognito-FF4F8B?style=for-the-badge&logo=amazonaws&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Crypto](https://img.shields.io/badge/Crypto-333333?style=for-the-badge&logo=bitcoin&logoColor=white)
![Jotai](https://img.shields.io/badge/Jotai-000000?style=for-the-badge&logo=jotai&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Passport](https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white)
![Google OAuth](https://img.shields.io/badge/Google%20OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Dagre (React Flow)](https://img.shields.io/badge/Dagre-0077b5?style=for-the-badge&logo=reactflow&logoColor=white)
![HTML to Image](https://img.shields.io/badge/HTML%20to%20Image-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![UUID](https://img.shields.io/badge/UUID-0077b5?style=for-the-badge&logo=uuid&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white)
</div>

# What we offer

<div align="center">

| Feature                                                                                                                                | Status    |
|----------------------------------------------------------------------------------------------------------------------------------------|-----------|
| Integration of `clickTracker` hook to monitor user clicks and interactions                                                              | ✅        |
| Real-time data collection and visualization in the OS Analytics dashboard                                                               | ✅        |
| Filters and export functionality added to the dashboard for reporting and the ability to drill down into specific user interactions and activities based on detailed, custom metrics for enhanced analysis capabilities | ✅        |
| Secure data tracking using JWT authentication                                                                                           | ✅        |
| Ability to configure multiple websites for tracking in the dashboard                                                                    | ✅        |
| Implemented AWS Bedrock for generating user activity reports                                                                            | ✅        |
| Fully documented API for developers to integrate and manage the tracking tool                                                           | ✅        |




</div> 

## Getting Started

1. To get started, visit [os-analytics.com](https://os-analytics.com) and create an account. After account creation, you will be directed to an onboarding page which will guide you through the steps below.

2. Install the OS Analytics package in your React application:

    NPM install `os-analytics`:
    ```bash
    npm install os-analytics
    ```

3. Integrate the `clickTracker` hook into your application:

    Import `clickTracker` in your main React component:
    ```javascript
    import clickTracker from 'os-analytics';
    ```

    Initialize the tracker with your API key and website at the top level (App):
    ```javascript
    const apiKey = '<your-api-key>';
    const website = '<your-website-url>';

    clickTracker(apiKey, website); // Start tracking clicks and interactions
    ```


4. Run your application:

    Once you've integrated the `clickTracker` and set up the environment variables, run your application as usual. The `clickTracker` will automatically start tracking user interactions on your website.

5. View Tracked Metrics:

    After interacting with your website, visit your [OS Analytics Dashboard](https://github.com/oslabs-beta/ActivityTracker.io/tree/main) to view the tracked metrics in real-time. You can filter, analyze, and export the data as needed.

## Tracked Metrics

- Click events
- Referrer events
- Page views per website
- Website views per account
- Heatmap
- Other event tracking: OS/Browsers

## The team

<div align='center'>

<table>
  <tr>
    <td style="text-align: center; padding: 20px;">
      <img src="https://drive.google.com/uc?export=view&id=1Kf6Uag0fScIaDLS84ocOE29oVLq1Lwhf" alt="Eric" width="120" style="border-radius: 50%;">
      <h3>Eric DiMarzio</h3>
      <a href="https://github.com/EricDiMarzio" style="text-decoration: none;">GitHub</a> |
      <a href="https://www.linkedin.com/in/ericdimarzio/" style="text-decoration: none;">LinkedIn</a>
    </td>

  <td style="text-align: center; padding: 20px;">
      <img src="https://drive.google.com/uc?export=view&id=1LVf_oNtekR2RuN7rp3LshK1MpYt1ghzp" alt="Peter" width="120" style="border-radius: 50%;">
      <h3>Peter Larcheveque</h3>
      <a href="https://github.com/plarchev" style="text-decoration: none;">GitHub</a> |
      <a href="https://linkedin.com/in/peter-larcheveque/" style="text-decoration: none;">LinkedIn</a>
    </td>

  <td style="text-align: center; padding: 20px;">
      <img src="https://drive.google.com/uc?export=view&id=1UVlPPUCFdOW-2dhitZutYzDzXTP-PXor" alt="David" width="120" style="border-radius: 50%;">
      <h3>David Naymon</h3>
      <a href="https://github.com/DavidN22" style="text-decoration: none;">GitHub</a> |
      <a href="https://www.linkedin.com/in/david-naymon-76520018a/" style="text-decoration: none;">LinkedIn</a>
    </td>

  <td style="text-align: center; padding: 20px;">
      <img src="https://drive.google.com/uc?export=view&id=1ziFJVuFL8lGfprFXq5SxgDLyKwrSOxz6" alt="Saw" width="120" style="border-radius: 50%;">
      <h3>Saw Yan Naing</h3>
      <a href="https://github.com/willsyn7" style="text-decoration: none;">GitHub</a> |
      <a href="https://www.linkedin.com/in/saw-naing/" style="text-decoration: none;">LinkedIn</a>
    </td>
  </tr>
</table>


</div>

##


