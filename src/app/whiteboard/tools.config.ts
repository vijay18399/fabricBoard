export const toolsConfig =
[     
    {    
        type: 'brush',
        handler:'tool',
        tools: [
            {   name :'Hand Draw',
            toolCode: 'perfect',
            icon: 'fa-solid fa-hand-point-up',
            display: true
            },
            {   name :'Pencil',
                toolCode: 'pencil',
                icon: 'fa-solid fa-pencil',
                display: true
            },
            {   name :'Spray Brush',
                toolCode: 'spraybrush',
                icon: 'fa-solid fa-paintbrush',
                display: true
            },
            {  name :'Circle Brush',
                toolCode: 'circlebrush',
                icon: 'fa-solid fa-circle',
                display: true
            }
        ],
        icon: 'fa-solid fa-pencil',
        lastUsed: null,
    },
   {
        type: 'selector',
        handler:'tool',
        tools: [
            {   name :'Laser',
                toolCode: 'laser',
                icon: 'fa-solid  fa-wand-magic-sparkles',
                display: true
            },
            { name :'Selector Mode',
                toolCode: 'selector',
                icon: 'fa-solid  fa-arrow-pointer',
                display: true
            },
            { name :'Pointer Mode',
                toolCode: 'pointer',
                icon: 'fa-solid fa-hand-point-up',
                display: true
            },
            { name :'Pan Mode',
            toolCode: 'panzoom',
            icon: 'fa-solid fa-hand',
            display: true
        }
        ],
        icon: 'fa-solid  fa-arrow-pointer',
        lastUsed: null,
   },
   {
    type: 'Shape',
    handler:'tool',
    tools: [
        {   name :'Circle',
            toolCode: 'circle',
            icon: 'fa-regular fa-circle',
            display: true
        },
        { name :'Square',
            toolCode: 'square',
            icon: 'fa-regular fa-square-full',
            display: true
        },
        { name :'Line',
            toolCode: 'line',
            icon: 'fa-solid fa-slash',
            display: true
        }
        
    ],
    icon: 'fa-solid  fa-shapes',
    lastUsed: null,
}
]     