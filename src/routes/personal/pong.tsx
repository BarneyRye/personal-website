import { createFileRoute } from '@tanstack/react-router'
import { FaDownload } from 'react-icons/fa'
import { PageHeader } from '@/components/page-header'
import {
  ProjectFigure,
  ProjectIntro,
  ProjectLink,
  ProjectList,
  ProjectSection,
  ProjectSpecs,
  RepoLink,
  type Spec,
} from '@/components/project'
import pongpaused from '@/public/pong/pongpaused.webp'

export const Route = createFileRoute('/personal/pong')({
  component: RouteComponent,
})

const REPO = 'https://github.com/BarneyRye/Pong'
const DOWNLOAD =
  'https://github.com/BarneyRye/Pong/releases/latest/download/Pong-windows.zip'

const SPECS: Spec[] = [
  { label: 'Language', value: 'C++20' },
  { label: 'Graphics', value: 'SDL3, statically linked' },
  { label: 'Build', value: 'CMake and Ninja, with GCC through MSYS2' },
  { label: 'Playfield', value: '800 x 600 logical, letterboxed to any window' },
  { label: 'Timing', value: 'Delta time in nanoseconds, VSync on' },
  { label: 'Release', value: 'GitHub Actions, single Windows .exe' },
]

const CONTROLS = [
  'W and S move the left paddle',
  'Up and Down arrows move the right paddle',
  'SPACE pauses and resumes the game',
  'R resets the score and the paddles',
  'F11 toggles fullscreen and ESC quits',
]

function RouteComponent() {
  return (
    <div className="space-y-12">
      <PageHeader text="Pong, written from scratch in C++ and SDL3" />

      <ProjectIntro>
        <p>
          I made this project to get more comfortable with C++ outside of
          embedded work, and to learn how a game loop is put together. Pong was
          a good place to start. The rules are simple enough to finish, but it
          still needs input handling, movement, collisions, scoring and drawing
          to all work together.
        </p>
        <p>
          It is a two player game on one keyboard. The graphics use SDL3, and
          the whole thing builds into a single Windows executable that can be
          downloaded and run without installing anything.
        </p>
      </ProjectIntro>

      <ProjectFigure
        src={pongpaused}
        alt="Pong game window on a dark background, showing a red 3 to 1 score, two thin white paddles, the ball and a PAUSED overlay"
        caption="The game paused mid match. The 800 x 600 playfield is letterboxed to fit a widescreen monitor, the score is drawn in red at the top, and a dimmed overlay covers the court while paused."
      />

      <ProjectSpecs specs={SPECS} />

      <ProjectSection title="How to play">
        <p>
          Download the latest release, extract the zip and run{' '}
          <span className="font-bold">pong.exe</span>. The game opens paused, so
          both players have time to get ready.
        </p>
        <ProjectList items={CONTROLS} />
      </ProjectSection>

      <ProjectSection title="The game loop">
        <p>
          Each frame does the same three things: handle input, update the game,
          then draw. The time since the last frame is measured with{' '}
          <span className="font-bold">SDL_GetTicksNS()</span>, and every speed
          in the game is multiplied by it. This means the ball and paddles move
          at the same rate whatever the frame rate is, instead of speeding up on
          a faster monitor.
        </p>
        <p>
          The game logic works in a fixed 800 x 600 space. SDL&rsquo;s logical
          presentation scales that up to whatever size the window is, adding
          black bars where the aspect ratio does not match. The window can be
          resized or made fullscreen without changing anything in the game code.
        </p>
      </ProjectSection>

      <ProjectSection title="Making it feel right">
        <p>
          The paddles accelerate rather than jump straight to full speed, but
          they accelerate hard, reaching their 500 px/s limit in a tenth of a
          second. When a paddle changes direction or its key is released, its
          velocity drops to zero straight away. That keeps the controls
          responsive and stops the paddle from drifting.
        </p>
        <p>
          The ball starts at 300 px/s and keeps speeding up for the whole rally,
          so long rallies get harder. When it hits a paddle, the paddle&rsquo;s
          vertical velocity is added to the ball&rsquo;s. This lets a player
          move the paddle into the ball to put an angle on the return. The new
          angle is capped at 60 degrees either side of horizontal so the ball
          never ends up bouncing almost straight up and down.
        </p>
      </ProjectSection>

      <ProjectSection title="Collisions">
        <p>
          The collision check does not test whether the ball overlaps a paddle.
          It checks whether the ball is level with the paddle and has reached or
          passed its front face. The paddles are only 3 px wide, and late in a
          rally the ball can move further than that in one frame. An overlap
          test would let it pass straight through, but this check cannot miss
          it.
        </p>
        <p>
          The bounces also depend on direction, not just position. After a hit,
          the ball is sent away from whichever half of the court it is in, and a
          wall only reflects the ball if it is moving towards that wall. This
          stops a bug, where the ball is still touching the paddle or wall on
          the next frame, bounces again, and gets stuck flipping back and forth.
        </p>
      </ProjectSection>

      <ProjectSection title="Building and releasing">
        <p>
          CMake fetches SDL3 straight from its GitHub repository and builds it
          as a static library. On Windows the C++ runtime is statically linked
          too, so the release is one executable with no DLLs to ship alongside
          it.
        </p>
        <p>
          A GitHub Actions workflow builds the game on every push using MSYS2
          and GCC, then strips and zips the executable. Pushing a version tag
          publishes that zip as a GitHub release, so the download link above
          always points to the latest build.
        </p>
      </ProjectSection>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <RepoLink href={REPO} label="BarneyRye/Pong" />
        <ProjectLink
          href={DOWNLOAD}
          Icon={FaDownload}
          label="Download for Windows"
        />
      </div>
    </div>
  )
}
