// @ts-check

/**
 * @typedef {import('../../../types').TaskStatus} TaskStatus
 */

/**
 * Template for the summary page
 * @param {TaskStatus} status 
 * @returns 
 */
export const summaryTemplate = (status) => /*html*/ `
    <div class="summaryLabel">
        <span class="text-normal-700 text-61px summaryText">Join 360</span>
        <img class="labelSeparator" src="./assets/img/summaryImg/labelSeparator.svg" alt="">
        <span class="text-normal-400 text-27px summaryText">Key Metrics at a Glance</span>
    </div>
    <div class="summary" id="summary">
        <div class="summaryRowTop">
            <div id="toDoTile" class="tileType1 boardLink">
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
                    <circle class="svgIconCircle" cx="35" cy="35" r="34.5" fill="#2A3647"/>
                    <path class="svgIconPath" d="M26.0612 44.1418H27.9279L39.4279 32.6418L37.5612 30.7751L26.0612 42.2751V44.1418ZM45.1279 30.7084L39.4612 25.1084L41.3279 23.2418C41.839 22.7307 42.4668 22.4751 43.2112 22.4751C43.9556 22.4751 44.5834 22.7307 45.0945 23.2418L46.9612 25.1084C47.4723 25.6195 47.739 26.2362 47.7612 26.9584C47.7834 27.6807 47.539 28.2973 47.0279 28.8084L45.1279 30.7084ZM43.1945 32.6751L29.0612 46.8084H23.3945V41.1418L37.5279 27.0084L43.1945 32.6751Z" fill="white"/>
                </svg>
                <div class="txtTypeX flex flex-col">
                    <span class="text-center text-normal-600 text-64px" id="amountToDo">${status.todo}</span>
                    <span class="text-normal-400 text-20px">To-do</span>
                </div>
            </div>
            <div  id="doneTile" class="tileType1 boardLink">
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                    <circle class="svgIconCircle" cx="34.8945" cy="34.8083" r="34.5" fill="#2A3647"/>
                    <path class="svgIconPath" d="M19.9229 34.8085L31.1516 45.8745L49.8662 23.7424" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>  
                <div class="txtTypeX flex flex-col">
                    <span class="text-center text-normal-600 text-64px" id="amountDone">${status.done}</span>
                    <span class="text-normal-400 text-20px">Done</span>
                </div>
            </div>
        </div>
        <div class="summaryRowMiddle">
            <div class="awaitingFeedback tileType2 boardLink gap-18">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="30" fill="#FF3D00"/>
                    <g transform="translate(12.5 17)">
                        <path d="M32.8709 25.1626C32.4699 25.1633 32.0792 25.0337 31.7563 24.7929L17.6511 14.263L3.54584 24.7929C3.34781 24.941 3.1229 25.0482 2.88394 25.1084C2.64497 25.1685 2.39664 25.1805 2.15312 25.1435C1.9096 25.1066 1.67566 25.0214 1.46465 24.893C1.25365 24.7645 1.06971 24.5953 0.923347 24.3949C0.776981 24.1945 0.671052 23.9669 0.611608 23.7251C0.552165 23.4832 0.54037 23.2319 0.576898 22.9855C0.65067 22.4878 0.916792 22.0402 1.31672 21.7411L16.5365 10.3677C16.8591 10.126 17.2498 9.99561 17.6511 9.99561C18.0524 9.99561 18.4431 10.126 18.7657 10.3677L33.9855 21.7411C34.3033 21.9781 34.5389 22.3106 34.6588 22.6912C34.7788 23.0718 34.7768 23.481 34.6532 23.8604C34.5296 24.2398 34.2907 24.57 33.9706 24.8039C33.6506 25.0377 33.2657 25.1633 32.8709 25.1626Z" fill="white"/>
                        <path d="M32.8708 15.2109C32.4697 15.2116 32.0791 15.082 31.7562 14.8413L17.651 4.31139L3.54572 14.8413C3.1458 15.1404 2.64482 15.2665 2.15301 15.1919C1.6612 15.1172 1.21883 14.8479 0.923233 14.4432C0.627633 14.0385 0.503012 13.5315 0.576784 13.0339C0.650556 12.5362 0.916678 12.0885 1.31661 11.7894L16.5364 0.415997C16.859 0.174366 17.2497 0.0439453 17.651 0.0439453C18.0523 0.0439453 18.443 0.174366 18.7655 0.415997L33.9854 11.7894C34.3031 12.0264 34.5388 12.359 34.6587 12.7396C34.7786 13.1202 34.7767 13.5294 34.6531 13.9088C34.5295 14.2882 34.2906 14.6184 33.9705 14.8522C33.6505 15.0861 33.2656 15.2116 32.8708 15.2109Z" fill="white"/>
                    </g>
                </svg> 
                <div class="txtTypeX flex flex-col">
                    <span class="text-center text-normal-600 text-64px" id="amountUrgent">${status.urgent}</span>
                    <span class="text-normal-400 text-16px">Urgent</span>
                </div>
                <img class="summarySeparator" src="./assets/img/summaryImg/summarySeparator.svg" alt="">
                <div class="flex flex-col items-start gap-13">
                    <span class="text-normal-700 text-21px" id="dateDeadline"></span>
                    <span class="text-normal-400 text-16px">Upcoming Deadline</span>
                </div>
            </div>
            <div class="titleWelcome flex flex-col justify-center items-start responsive-welcomeText" id="welcomeText">
                <span id="greeting" class="text-normal-500 text-47px"></span>
                <span id="user" class="titleWelcomeName text-normal-700 text-50px break-word"></span>
            </div>
        </div>
        <div class="summaryRowBottom">
            <div class="tasksInBoard tileType3 boardLink">
                <span class="text-center text-normal-600 text-64px" id="amountTasksInBoard">${status.board}</span>
                <span class="text-center text-normal-400 text-20px">Tasks in <br>Board</span>
            </div>
            <div class="tasksInProgress tileType3 boardLink">
                <span class="text-center text-normal-600 text-64px" id="amountTasksInProgress">${status.progress}</span>
                <span class="text-center text-normal-400 text-20px">Tasks in <br>Progress</span>
            </div>
            <div class="awaitingFeedback tileType3 boardLink">
                <span class="text-center text-normal-600 text-64px" id="amountAwaitingFeedback">${status.feedback}</span>
                <span class="text-center text-normal-400 text-20px">Awaiting<br>Feedback</span>
            </div>
        </div>
    </div>
`;