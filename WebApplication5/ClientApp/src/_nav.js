

export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      title: true,
      name: 'Modules',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Discrete Math',
      url: '/theme/colors',
      icon: 'icon-pencil'
    },
    {
      name: 'Kalkulus',
      url: '/theme/typography',
      icon: 'icon-pencil'
    },
   {
      name: 'Card',
      url: '/base/cards',
      icon: 'icon-pencil'
    }
  ]
};
