// @ts-check

/**
 * Template for the help page
 * @returns html code
 */
export const helpTemplate = () => /*html*/ `
    <div class="flex justify-between w-full items-start">
        <span class="titleH1 text-normal-700 text-61px pb-32">Help</span>
        <svg class="blue-arrow pointer" xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
            <path d="M9.75607 13.4145H22.6391C23.276 13.4145 23.7922 13.9307 23.7922 14.5676C23.7922 15.2045 23.276 15.7208 22.6391 15.7208H9.75607L15.1263 21.091C15.5766 21.5413 15.5766 22.2713 15.1263 22.7216C14.676 23.1718 13.946 23.1718 13.4957 22.7216L6.75601 15.9818C5.97496 15.2008 5.97496 13.9345 6.75601 13.1534L13.4957 6.41367C13.946 5.9634 14.676 5.9634 15.1263 6.41367C15.5766 6.86393 15.5766 7.59396 15.1263 8.04423L9.75607 13.4145Z" fill="#29ABE2"/>
        </svg>
    </div>
    <div class="flex flex-col gap-24">
        <div class="text-normal-400 text-16px">
            <p>Welcome to the help page for <span class="light-blue">Join</span>,
                your guide to using our kanban project management tool. Here, we'll
                provide overview of what <span class="light-blue">Join</span> is,
                how it can benefit, you and how an to use it.</p>
        </div>
        <div class="flex flex-col gap-16">
            <h2>What is Join?</h2>
            <div class="text-normal-400 text-16px">
                <p><span class="light-blue">Join</span> is a kanban-based project
                    management tool designed and built by a group of dedicated students
                    as part of their web development bootcamp at the Developer Akademie.</p>
                <p>Kanban, a Japanese term meaning "billboard", is a highly effective
                    method to visualize work, limit work-in-progress, and maximize
                    efficiency (or flow). <span class="light-blue">Join</span> leverages
                    the principles of kanban to help users manage their tasks and projects
                    in an intuitive, visual interface.</p>
                <p>It is important to note that <span class="light-blue">Join</span> is
                    designed as an educational exercise and is not intended for extensive
                    business usage. While we strive to ensure the best possible user
                    experience, we cannot guarantee consistent availability, reliability,
                    accuracy, or other aspects of quality regarding <span class="light-blue">Join</span>.</p>
            </div>
        </div>
        <div>
            <h2>How to use it</h2>
        </div>
        <div class="flex flex-col items-start gap-16">
            <p>Here is a step-by-step guide on how to use <span class="light-blue">Join</span>:</p>
            <div>
                <div class="flex items-start gap-35">
                    <p class="text-normal-400 text-27px">1.</p>
                    <div>
                        <h3>Exploring the Board</h3>
                        <p>
                            When you log in to <span class="light-blue">Join</span>, you'll find a
                            default board. This board represents your project and contains four default
                            lists: "To Do", "In Progress", “Await feedback” and "Done".</p>
                    </div>
                </div>
                <div class="flex items-start gap-35">
                    <p class="text-normal-400 text-27px">2.</p>
                    <div>
                        <h3>Creating Contacts</h3>
                        <p>In <span class="light-blue">Join</span>, you can add contacts to collaborate
                            on your projects. Go to the "Contacts" section, click on "New contact", and
                            fill in the required information. Once added, these contacts can be assigned
                            tasks and they can interact with the tasks on the board.</p>
                    </div>
                </div>
                <div class="flex items-start gap-35">
                    <p class="text-normal-400 text-27px">3.</p>
                    <div>
                        <h3>Adding Cards</h3>
                        <p>Now that you've added your contacts, you can start adding cards. Cards represent
                            individual tasks. Click the "+" button under the appropriate list to create a
                            new card. Fill in the task details in the card, like task name, description,
                            due date, assignees, etc.</p>
                    </div>
                </div>
                <div class="flex items-start gap-35">
                    <p class="text-normal-400 text-27px">4.</p>
                    <div>
                        <h3>Moving Cards</h3>
                        <p>As the task moves from one stage to another, you can reflect that on the board
                            by dragging and dropping the card from one list to another.</p>
                    </div>
                </div>
                <div class="flex items-start gap-35">
                    <p class="text-normal-400 text-27px">5.</p>
                    <div>
                        <h3>Deleting Cards</h3>
                        <p>Once a task is completed, you can either move it to the "Done"
                        list or delete it. Deleting a card will permanently remove it from the board.
                        Please exercise caution when deleting cards, as this action is irreversible.</p>
                        <p>Remember that using <span class="light-blue">Join</span> effectively requires consistent updates from you and
                        your team to ensure the board reflects the current state of your project.
                        <p>Have more questions about <span class="light-blue">Join</span>? Feel free to contact us at [Your Contact Email].</p>
                        We're here to help you!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
