<script setup lang="ts">
</script>

<template>
           <Card
              className="group relative overflow-hidden rounded-3xl border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <CardContent className="relative h-[600px] p-0">
                {/* Project Image */}
                <img src={project.image || "/placeholder.svg"} alt={project.title} className="size-full object-cover" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  {/* Top Content - Title & Description */}
                  <div className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="mb-2 font-serif text-2xl font-light text-white text-balance">{project.title}</h3>
                    <p className="text-sm leading-relaxed text-white/80 text-pretty">{project.description}</p>
                  </div>

                  {/* Bottom Content - Tags & Icon */}
                  <div className="flex items-end justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="rounded-full border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:bg-white/20">
                      <ArrowUpRight className="size-5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
</template>
