export default {
    title: 'Contact',
    name: 'contactForm',
    type: 'object',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title'
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: `Form: ${title}`,
            }
        }
    }
}
