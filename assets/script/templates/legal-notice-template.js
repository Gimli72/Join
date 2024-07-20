// @ts-check

/**
 * Template for the legal notice page
 * @returns html code
 */
export const legalNoticeTemplate = () => /*html*/ `
    <div class="flex justify-between w-full items-start">
        <span class="titleH1 text-normal-700 text-61px pb-32">Legal Notice</span>
        <img src="./assets/img/arrow-left-line.svg" class="blue-arrow pointer" id="blue-arrow">
    </div>

    <div class="flex flex-col">
        <section class="flex flex-col gab-16">
            <h2 class="text-normal-700 text-27px">Imprint</h2>
            <ul>
                <li>Thomas Greff, Wolfgang Strutzenberger und Stefan Droste</li>
                <li>Join Street No. 8</li>
                <li>01210 VA Join City</li>
            </ul>
            <br>
            <h3 class="text-normal-700 text-20px">Exploring the Board</h3>
            <p class="text-normal-400 text-16px">Email: info&commat;join25.com</p>
        </section>
        <section>
            <h3 class="text-normal-700 text-20px">Acceptance of terms</h3>
            <p class="text-normal-400 text-16px">By accessing and using <span class="light-blue">Join</span> (Product), you acknowledge and agree to the following terms and conditions, and any policies, guidelines, or amendments thereto that may be presented to you form time to time. We, the listed students, may update or change the terms and conditions from time to time without notice.</p>
        </section>
        <section>
            <h3 class="text-normal-700 text-20px">Scope and ownership of the product</h3>
            <p class="text-normal-400 text-16px"><span class="light-blue">Join</span> has been developed as part of a student group project in a web development bootcamp at the <span class="light-blue">Developer Akademie GmbH</span>. It has an educational purpose and is not intended for extensive personal & business usage. As such, we cannot guarantee consistent availability, reliability, accuracy, or any other aspect of quality regarding this Product.</p>
            <p class="text-normal-400 text-16px">The design of <span class="light-blue">Join</span> is owned by the <span class="light-blue">Developer Akademie GmbH</span>. Unauthorized use, reproduction, modification, distribution, or replication of the design is strictly prohibited.</p>
        </section>
        <section>
            <h3 class="text-normal-700 text-20px">Proprietary rights</h3>
            <p class="text-normal-400 text-16px">Aside from the design owned by <span class="light-blue">Developer Akademie GmbH</span>, we, the listed students, retain all proprietary rights in <span class="light-blue">Join</span>, including any associated copyrighted material, trademarks, and other proprietary information.</p>
        </section>
        <section>
            <h3 class="text-normal-700 text-20px">Use of the product</h3>
            <p class="text-normal-400 text-16px"><span class="light-blue">Join</span> is intended to be used for lawful purposes only, in accordance with all applicable laws and regulations. Any use of <span class="light-blue">Join</span> for illegal activities, or to harass, harm, threaten, or intimidate another person, is strictly prohibited. You are solely responsible for your interactions with other user of <span class="light-blue">Join</span>.</p>
        </section>
        <section>
            <h3 class="text-normal-700 text-20px">Disclaimer of warranties and limitation of liability</h3>
            <p class="text-normal-400 text-16px"><span class="light-blue">Join</span> is provided "as is" without warranty of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event will we, the listed students, or the <span class="light-blue">Developer Akademie GmbH</span>, be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including dut not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses, even if we have been advised of the possibility of such damages, arising out of or in connection with the use or performance of <span class="light-blue">Join</span>.</p>
        </section>
        <section>
            <h3 class="text-normal-700 text-20px">Indemnity</h3>
            <p class="text-normal-400 text-16px">You agree to indemnify, defend and hold harmless us, the listed students, the <span class="light-blue">Developer Akademie GmbH</span>, and our affiliates, partners, officer, directors, agents, and employees, from and against any claim, demand, loss, damage, cost, or liability (including reasonable legal fees), arising out of or in connection with the use or performance of <span class="light-blue">Join</span></p>
            <p class="text-normal-400 text-16px">For any questions or notices, please contact us at info&commat;join25.com</p>
            <p class="text-normal-400 text-16px">Date: February 11, <span id="dummyTasks">2024</span></p>
        </section>
    </div>
`;