"use client"

import { toast as sonnerToast, type ToastT } from "sonner"
import { Button } from "@/lib/shadcn/button"
import { useEffect, useState } from "react"
import { AlertCircle, CheckCircle, Info, Loader2, XCircle } from "lucide-react"

// -- TYPES -- //

type ToastPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"
type ToastVariant = "default" | "success" | "error" | "warning" | "info"

interface BaseToastOptions {
  description?: string
  position?: ToastPosition
  actionLabel?: string
  onAction?: () => void
}

interface ProgressToastOptions extends BaseToastOptions {
  duration?: number
  variant?: ToastVariant
}

interface AlertToastOptions extends BaseToastOptions {
  duration?: number
}

interface LoadingToastOptions extends BaseToastOptions {}

// Base toast component with synchronized background and custom line progress
function ProgressToast({
  title,
  description,
  duration,
  t,
  actionLabel,
  onAction,
  variant = "default",
}: {
  title: string
  description?: string
  duration: number
  t: string | number | undefined
  actionLabel?: string
  onAction?: () => void
  variant?: ToastVariant
}) {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const startTime = Date.now()
    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, duration - elapsed)
      const newProgress = (remaining / duration) * 100
      setProgress(newProgress)
      if (remaining <= 0) {
        clearInterval(intervalId)
        sonnerToast.dismiss(t)
      }
    }, 16) // roughly 60fps for smooth animation
    return () => clearInterval(intervalId)
  }, [duration, t])

  // -- STYLES -- //

  const variantStyles = {
    default: "bg-primary/15",
    success: "bg-green-500/15",
    error: "bg-red-500/15",
    warning: "bg-yellow-500/15",
    info: "bg-blue-500/15",
  }

  const progressBarStyles = {
    default: "bg-primary",
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  }

  const iconColorStyles = {
    default: "text-primary",
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  }

  const Icon = {
    default: null,
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  }[variant]

  return (
    <div className="relative rounded-md border bg-background shadow-sm overflow-hidden">
      {/* Background progress that shrinks as time passes */}
      <div
        className={`absolute inset-0 pointer-events-none ${variantStyles[variant]}`}
        style={{ transform: `scaleX(${progress / 100})`, transformOrigin: "left" }}
      />
      {/* Toast content with padding */}
      <div className="p-4 relative z-10">
        <div className="flex items-start gap-3">
          {Icon && <Icon className={`h-5 w-5 ${iconColorStyles[variant]} shrink-0`} />}
          <div className="flex-1">
            <div className="font-medium">{title}</div>
            {description && <div className="text-sm text-muted-foreground mt-1">{description}</div>}
            {actionLabel && onAction && (
              <div className="mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    onAction()
                    sonnerToast.dismiss(t)
                  }}
                >
                  {actionLabel}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Custom progress line at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-muted">
        <div className={progressBarStyles[variant]} style={{ width: `${progress}%`, height: "100%" }} />
      </div>
    </div>
  )
}

// Loading toast component
function LoadingToast({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="rounded-md border bg-background p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <div>
          <div className="font-medium">{title}</div>
          {description && <div className="text-sm text-muted-foreground mt-1">{description}</div>}
        </div>
      </div>
    </div>
  )
}

// Alert toast component (no progress)
function AlertToast({
  title,
  description,
  variant,
  actionLabel,
  onAction,
  t,
}: {
  title: string
  description?: string
  variant: Exclude<ToastVariant, "default">
  actionLabel?: string
  onAction?: () => void
  t: string | number | undefined
}) {
  const Icon = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  }[variant]

  const variantStyles = {
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  }

  return (
    <div className="rounded-md border bg-background p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 ${variantStyles[variant]} shrink-0`} />
        <div className="flex-1">
          <div className="font-medium">{title}</div>
          {description && <div className="text-sm text-muted-foreground mt-1">{description}</div>}
          {actionLabel && onAction && (
            <div className="mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  onAction()
                  sonnerToast.dismiss(t)
                }}
              >
                {actionLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Define the toast API type
interface ToastAPI {
  progress: (title: string, options?: ProgressToastOptions) => string | number
  loading: (title: string, options?: LoadingToastOptions) => string | number
  success: (title: string, options?: AlertToastOptions) => string | number
  error: (title: string, options?: AlertToastOptions) => string | number
  warning: (title: string, options?: AlertToastOptions) => string | number
  info: (title: string, options?: AlertToastOptions) => string | number
  dismiss: (toastId?: string | number) => void
}

// Reusable toast API
export const toast: ToastAPI = {
  // Progress toast with auto-dismiss
  progress: (
    title: string,
    {
      description,
      duration = 5000,
      position = "bottom-right",
      actionLabel,
      onAction,
      variant = "default",
    }: ProgressToastOptions = {},
  ) => {
    return sonnerToast.custom(
      (t) => (
        <ProgressToast
          title={title}
          description={description}
          duration={duration}
          t={t}
          actionLabel={actionLabel}
          onAction={onAction}
          variant={variant}
        />
      ),
      {
        duration,
        position,
      },
    )
  },

  // Loading toast (persists until dismissed)
  loading: (title: string, { description, position = "bottom-right" }: LoadingToastOptions = {}) => {
    return sonnerToast.custom(() => <LoadingToast title={title} description={description} />, {
      duration: Number.POSITIVE_INFINITY, // Stays until dismissed
      position,
    })
  },

  // Alert toast types
  success: (
    title: string,
    { description, duration = 5000, position = "bottom-right", actionLabel, onAction }: AlertToastOptions = {},
  ) => {
    return sonnerToast.custom(
      (t) => (
        <AlertToast
          title={title}
          description={description}
          variant="success"
          actionLabel={actionLabel}
          onAction={onAction}
          t={t}
        />
      ),
      {
        duration,
        position,
      },
    )
  },

  error: (
    title: string,
    { description, duration = 5000, position = "bottom-right", actionLabel, onAction }: AlertToastOptions = {},
  ) => {
    return sonnerToast.custom(
      (t) => (
        <AlertToast
          title={title}
          description={description}
          variant="error"
          actionLabel={actionLabel}
          onAction={onAction}
          t={t}
        />
      ),
      {
        duration,
        position,
      },
    )
  },

  warning: (
    title: string,
    { description, duration = 5000, position = "bottom-right", actionLabel, onAction }: AlertToastOptions = {},
  ) => {
    return sonnerToast.custom(
      (t) => (
        <AlertToast
          title={title}
          description={description}
          variant="warning"
          actionLabel={actionLabel}
          onAction={onAction}
          t={t}
        />
      ),
      {
        duration,
        position,
      },
    )
  },

  info: (
    title: string,
    { description, duration = 5000, position = "bottom-right", actionLabel, onAction }: AlertToastOptions = {},
  ) => {
    return sonnerToast.custom(
      (t) => (
        <AlertToast
          title={title}
          description={description}
          variant="info"
          actionLabel={actionLabel}
          onAction={onAction}
          t={t}
        />
      ),
      {
        duration,
        position,
      },
    )
  },

  // Expose the original dismiss method
  dismiss: sonnerToast.dismiss,
}

