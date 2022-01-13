import scala.io.*

def read = Source.fromFile("3.in").getLines.toList

def timeup[A](f: (List[A]) => Unit, lines: List[A]): Unit = 
  val start = System.nanoTime()
  f(lines)
  val end = System.nanoTime()
  val diff = end - start
  val s = diff / 1_000_000_000
  val ms = diff / 1_000_000 - 1000 * s
  val mus = diff / 1000 - 1000 * ms - 1000_000 * s
  val ns = diff % 1_000
  println(s"time: $s s $ms ms $mus μs $ns ns")

case class Rect(id: Int, x0: Int, y0: Int, x1: Int, y1: Int)
object Rect {
  def apply(line: String): Rect = 
    val re = raw"#(\d+) @ (\d+),(\d+): (\d+)x(\d+)".r
    val list = re.findAllMatchIn(line).toList.head.subgroups.map(_.toInt)
    val (id, x0, y0, x1, y1) = list match {
      case List(id, x0, y0, x1, y1) => (id, x0, y0, x1, y1)  
      case _ => (0,0,0,0,0)
    }
    this(id, x0, y0, x0 + x1 - 1, y0 + y1 - 1)
}


def parse(lines: List[String]): List[Rect] = 
  lines.map(Rect.apply)

import scala.math.{max}
def maxs(rects: List[Rect]): (Int, Int) = 
  (rects.map(r => r.x1).max, rects.map(r => r.y1).max)

def clothParse(rects: List[Rect]) =
  val (maxx, maxy) = maxs(rects)
  val cloth = Array.fill(maxx + 2, maxy + 2)("")
  rects.map(r => for x <- r.x0 to r.x1 
                     y <- r.y0 to r.y1
                 do 
                   cloth(y)(x) = cloth(y)(x) + "," + r.id.toString
           )
  // cloth.map(line => println(line.mkString(" ")))
  cloth

def part1(rects: List[Rect]) = 
  val ans = clothParse(rects)
            .map(line => line
                          .map(e => e.split(",").tail.length)
                          .filter(e => e > 1).length)
            .reduce(_+_)
  println(s"part1: $ans")

def part2(rects: List[Rect]) = 
  val cloth = clothParse(rects)
  val overlap = Array.fill(rects.length + 1)(false)
  overlap(0) = true
  cloth.map(line =>
        line.map(e => e.split(",").tail)
            .filter(e => e.length > 1)
            .foreach(e => e.map(ee => overlap(ee.toInt) = true))
      )
  overlap.zipWithIndex.filter((e, i) => e == false).foreach((e, i) => println(s"part2: $i"))
  

@main def solve = 
  val rects = parse(read)
  timeup(part1, rects)
  timeup(part2, rects)









