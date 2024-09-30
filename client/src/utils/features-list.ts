export interface Feature {
  id: string
  title: string
  description: string
}

export const featuresList: Feature[] = [
  {
    id: '1',
    title: 'Live editing',
    description:
      'Instantly see the result of every change you make.',
  },
  {
    id: '2',
    title: 'Autocompletion',
    description:
      'spotless will suggest the right classes for you as you type.',
  },
  {
    id: '3',
    title: 'Easy navigation',
    description:
      'Hover over any element to see its Tailwind classes. Press Space to easily pin and edit the element.',
  },
]
