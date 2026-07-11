function LoadingState() {
  return (
    <div class="rounded-box border border-base-300 bg-base-100 p-8 shadow-lg">
      <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <span class="loading loading-spinner loading-lg text-primary" />
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">Loading state</p>
          <h2 class="mt-2 text-2xl font-bold">Bootstrapping the starter workspace</h2>
          <p class="section-copy mt-3">
            App-level providers, local defaults, and the reference feature are initializing before the
            first screen renders.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoadingState
