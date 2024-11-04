import { html } from 'lit-html'
import { component } from 'haunted'

interface ToasterProps {
    message: string;
    className: string;
}

function Toaster({ message, className }: ToasterProps) {
    return html`
        <link rel="stylesheet" href="/dist/styles.css" />
        <div class="toaster-wrapper ${className}">
            <p>${message}</p>
        </div>
    `
}

customElements.define('toaster-component', component(Toaster))
