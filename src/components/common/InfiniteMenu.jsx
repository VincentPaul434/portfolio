const InfiniteMenu = ({ items = [], speed = 24, className = "" }) => {
  const loopItems = [...items, ...items]

  return (
    <>
      <style>
        {`
          .infinite-menu-root {
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 0.8rem;
            background:
              linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02)),
              rgba(7, 7, 8, 0.92);
          }

          .infinite-menu-root::before,
          .infinite-menu-root::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            height: 4.5rem;
            pointer-events: none;
            z-index: 2;
          }

          .infinite-menu-root::before {
            top: 0;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.96), rgba(0, 0, 0, 0));
          }

          .infinite-menu-root::after {
            bottom: 0;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.96), rgba(0, 0, 0, 0));
          }

          .infinite-menu-viewport {
            height: 25rem;
            overflow: hidden;
            padding: 1rem;
          }

          .infinite-menu-track {
            display: grid;
            gap: 0.9rem;
            animation: infinite-menu-scroll linear infinite;
            animation-duration: var(--infinite-menu-duration, 24s);
          }

          .infinite-menu-root:hover .infinite-menu-track {
            animation-play-state: paused;
          }

          .infinite-menu-card {
            display: grid;
            gap: 0.7rem;
            padding: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.09);
            border-radius: 0.7rem;
            background: rgba(255, 255, 255, 0.03);
            transform: translateZ(0);
          }

          .infinite-menu-card-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
          }

          .infinite-menu-title {
            color: #fff;
            font-family: var(--font-ui, inherit);
            font-size: 0.88rem;
            font-weight: 800;
            text-transform: uppercase;
          }

          .infinite-menu-index {
            color: rgba(255, 255, 255, 0.32);
            font-family: var(--font-mono, inherit);
            font-size: 0.76rem;
            font-weight: 700;
          }

          .infinite-menu-copy {
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.92rem;
            line-height: 1.65;
          }

          .infinite-menu-tools {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .infinite-menu-tool {
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 999px;
            padding: 0.32rem 0.6rem;
            color: rgba(255, 255, 255, 0.84);
            font-family: var(--font-ui, inherit);
            font-size: 0.68rem;
            font-weight: 700;
          }

          @keyframes infinite-menu-scroll {
            from {
              transform: translateY(0);
            }
            to {
              transform: translateY(calc(-50% - 0.45rem));
            }
          }
        `}
      </style>

      <div
        className={`infinite-menu-root ${className}`.trim()}
        style={{ "--infinite-menu-duration": `${speed}s` }}
      >
        <div className="infinite-menu-viewport">
          <div className="infinite-menu-track">
            {loopItems.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="infinite-menu-card"
                aria-hidden={index >= items.length}
              >
                <div className="infinite-menu-card-head">
                  <span className="infinite-menu-title">{item.title}</span>
                  <span className="infinite-menu-index">{item.index}</span>
                </div>

                <p className="infinite-menu-copy">{item.description}</p>

                <div className="infinite-menu-tools">
                  {item.tools.map((tool) => (
                    <span key={tool} className="infinite-menu-tool">
                      {tool}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default InfiniteMenu
